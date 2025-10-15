#![no_std]
use soroban_sdk::{contract, contractimpl, contracttype, token, Env, Address, String, Vec, BytesN, Bytes, xdr::ToXdr};

#[contracttype]
#[derive(Clone)]
pub struct Lesson {
    pub question: String,
    pub answer_hash: BytesN<32>,
}

#[contracttype]
#[derive(Clone)]
pub struct Quest {
    pub name: String,
    pub description: String,
    pub lessons: Vec<Lesson>,
    pub reward_amount: i128,
    pub certificate_nft_url: String,
}

#[contracttype]
#[derive(Clone)]
enum DataKey {
    Admin,
    Token,
    NextQuestId,
    Quest(u32),
    UserProgress(Address, u32),
    NftCertificate(Address, u32),
}

pub trait ChainQuestTrait {
    fn initialize(e: Env, admin: Address, token: Address);
    fn create_quest(e: Env, admin: Address, name: String, description: String, lessons: Vec<Lesson>, reward: i128, nft_url: String) -> u32;
    fn submit_answer(e: Env, user: Address, quest_id: u32, lesson_id: u32, answer: String);
    fn get_quest(e: Env, quest_id: u32) -> Quest;
    fn get_user_progress(e: Env, user: Address, quest_id: u32) -> u32;
    fn has_certificate(e: Env, user: Address, quest_id: u32) -> bool;
}

#[contract]
pub struct ChainQuest;

#[contractimpl]
impl ChainQuestTrait for ChainQuest {
    fn initialize(e: Env, admin: Address, token: Address) {
        if e.storage().instance().has(&DataKey::Admin) {
            panic!("already initialized");
        }
        e.storage().instance().set(&DataKey::Admin, &admin);
        e.storage().instance().set(&DataKey::Token, &token);
    }

    fn create_quest(e: Env, admin: Address, name: String, description: String, lessons: Vec<Lesson>, reward: i128, nft_url: String) -> u32 {
        let current_admin: Address = e.storage().instance().get(&DataKey::Admin).unwrap();
        current_admin.require_auth();
        admin.require_auth();

        let quest_id: u32 = e.storage().instance().get(&DataKey::NextQuestId).unwrap_or(0);

        let new_quest = Quest {
            name,
            description,
            lessons,
            reward_amount: reward,
            certificate_nft_url: nft_url,
        };

        e.storage().instance().set(&DataKey::Quest(quest_id), &new_quest);
        e.storage().instance().set(&DataKey::NextQuestId, &(quest_id + 1));
        
        quest_id
    }

    fn submit_answer(e: Env, user: Address, quest_id: u32, lesson_id: u32, answer: String) {
        user.require_auth();

        let quest = Self::get_quest(e.clone(), quest_id);
        let current_progress = Self::get_user_progress(e.clone(), user.clone(), quest_id);

        if lesson_id != current_progress {
            panic!("invalid lesson order");
        }

        let lesson = quest.lessons.get(lesson_id).unwrap();
        
        let answer_bytes: Bytes = answer.to_xdr(&e);
        let answer_hash: BytesN<32> = e.crypto().sha256(&answer_bytes).into();

        if answer_hash != lesson.answer_hash {
            panic!("incorrect answer");
        }
        
        let new_progress = current_progress + 1;
        e.storage().instance().set(&DataKey::UserProgress(user.clone(), quest_id), &new_progress);

        if new_progress == quest.lessons.len() {
            e.storage().instance().set(&DataKey::NftCertificate(user.clone(), quest_id), &true);
            
            let token_address: Address = e.storage().instance().get(&DataKey::Token).unwrap();
            let token_client = token::Client::new(&e, &token_address);
            let admin: Address = e.storage().instance().get(&DataKey::Admin).unwrap();
            
            token_client.transfer(&admin, &user, &quest.reward_amount);
        }
    }

    fn get_quest(e: Env, quest_id: u32) -> Quest {
        e.storage().instance().get(&DataKey::Quest(quest_id)).unwrap()
    }

    fn get_user_progress(e: Env, user: Address, quest_id: u32) -> u32 {
        e.storage().instance().get(&DataKey::UserProgress(user, quest_id)).unwrap_or(0)
    }
    
    fn has_certificate(e: Env, user: Address, quest_id: u32) -> bool {
        e.storage().instance().get(&DataKey::NftCertificate(user, quest_id)).unwrap_or(false)
    }
}