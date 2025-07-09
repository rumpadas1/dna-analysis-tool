from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

router = APIRouter()

class MutationInput(BaseModel):
    reference: str
    sample: str

@router.post("/")
def detect_mutations(data: MutationInput):
    ref = data.reference.upper()
    sample = data.sample.upper()

    if len(ref) != len(sample):
        raise HTTPException(status_code=400, detail="Reference and sample must be the same length.")

    mutations = []
    for i, (r, s) in enumerate(zip(ref, sample)):
        if r != s:
            mutations.append({
                "position": i + 1,
                "reference": r,
                "sample": s
            })

    return {
        "total_mutations": len(mutations),
        "mutations": mutations
    }
