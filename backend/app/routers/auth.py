from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from passlib.context import CryptContext
from jose import jwt
import time, os, json

router = APIRouter()
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

SECRET_KEY = "mysecret"  # Replace with a strong secret for production
ALGORITHM = "HS256"
USER_FILE = os.path.join(os.path.dirname(__file__), '..', 'users.json')

# Pydantic model
class User(BaseModel):
    username: str
    password: str

# Load users from JSON file
def load_users():
    if not os.path.exists(USER_FILE):
        return {}
    with open(USER_FILE, 'r') as f:
        return json.load(f)

# Save users to JSON file
def save_users(users):
    with open(USER_FILE, 'w') as f:
        json.dump(users, f)

@router.post("/signup")
def signup(user: User):
    users = load_users()
    if user.username in users:
        raise HTTPException(status_code=400, detail="Username already exists")
    hashed_pw = pwd_context.hash(user.password)
    users[user.username] = hashed_pw
    save_users(users)
    return {"msg": "User created successfully"}

@router.post("/login")
def login(user: User):
    users = load_users()
    if user.username not in users or not pwd_context.verify(user.password, users[user.username]):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token_payload = {
        "sub": user.username,
        "exp": time.time() + 3600  # 1 hour expiry
    }
    token = jwt.encode(token_payload, SECRET_KEY, algorithm=ALGORITHM)
    return {"access_token": token, "token_type": "bearer"}
