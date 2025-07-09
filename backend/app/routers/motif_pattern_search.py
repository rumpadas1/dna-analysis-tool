from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

router = APIRouter()

class PatternSearchInput(BaseModel):
    sequence: str
    pattern: str

@router.post("/")
def search_pattern(data: PatternSearchInput):
    sequence = data.sequence.upper()
    pattern = data.pattern.upper()

    if not sequence or not pattern:
        raise HTTPException(status_code=400, detail="Both sequence and pattern are required.")

    if any(nuc not in "ATGC" for nuc in sequence + pattern):
        raise HTTPException(status_code=400, detail="Invalid characters in sequence or pattern.")

    matches = []
    for i in range(len(sequence) - len(pattern) + 1):
        if sequence[i:i+len(pattern)] == pattern:
            matches.append(i)

    return {
        "pattern": pattern,
        "matches": matches,
        "count": len(matches)
    }
