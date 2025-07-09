from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

router = APIRouter()

class DNAInput(BaseModel):
    sequence: str

@router.post("/")
def gc_content(data: DNAInput):
    seq = data.sequence.upper()
    
    # Validate: only allow A, T, G, C
    if not all(base in "ATGC" for base in seq):
        raise HTTPException(status_code=400, detail="Invalid DNA sequence. Use only A, T, G, C.")

    gc_count = seq.count("G") + seq.count("C")
    gc_percent = (gc_count / len(seq)) * 100 if len(seq) > 0 else 0

    return {
        "gc_content_percent": round(gc_percent, 2),
        "length": len(seq),
        "gc_count": gc_count
    }
