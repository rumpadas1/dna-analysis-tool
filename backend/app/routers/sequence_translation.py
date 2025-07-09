from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

router = APIRouter()

# Codon to amino acid translation table
codon_table = {
    "ATA": "I", "ATC": "I", "ATT": "I", "ATG": "M",
    "ACA": "T", "ACC": "T", "ACG": "T", "ACT": "T",
    "AAC": "N", "AAT": "N", "AAA": "K", "AAG": "K",
    "AGC": "S", "AGT": "S", "AGA": "R", "AGG": "R",
    "CTA": "L", "CTC": "L", "CTG": "L", "CTT": "L",
    "CCA": "P", "CCC": "P", "CCG": "P", "CCT": "P",
    "CAC": "H", "CAT": "H", "CAA": "Q", "CAG": "Q",
    "CGA": "R", "CGC": "R", "CGG": "R", "CGT": "R",
    "GTA": "V", "GTC": "V", "GTG": "V", "GTT": "V",
    "GCA": "A", "GCC": "A", "GCG": "A", "GCT": "A",
    "GAC": "D", "GAT": "D", "GAA": "E", "GAG": "E",
    "GGA": "G", "GGC": "G", "GGG": "G", "GGT": "G",
    "TCA": "S", "TCC": "S", "TCG": "S", "TCT": "S",
    "TTC": "F", "TTT": "F", "TTA": "L", "TTG": "L",
    "TAC": "Y", "TAT": "Y", "TAA": "_", "TAG": "_",
    "TGC": "C", "TGT": "C", "TGA": "_", "TGG": "W",
}

class DNAInput(BaseModel):
    sequence: str

def reverse_complement(seq: str) -> str:
    complement = {'A': 'T', 'T': 'A', 'G': 'C', 'C': 'G'}
    return ''.join(complement.get(base, base) for base in reversed(seq))

@router.post("/")
def translate_sequence(data: DNAInput):
    # Clean input
    seq = data.sequence.upper().strip()
    seq = seq.replace(" ", "").replace("\n", "").replace("3'", "").replace("5'", "").replace("-", "")
    
    # Check if it's a 3' to 5' strand — reverse complement it
    if "3" in data.sequence and "5" in data.sequence:
        seq = reverse_complement(seq)

    # Sequence must be divisible by 3
    if len(seq) % 3 != 0:
        raise HTTPException(status_code=400, detail="DNA sequence length must be a multiple of 3")

    # Translate codons
    protein = ""
    for i in range(0, len(seq), 3):
        codon = seq[i:i+3]
        protein += codon_table.get(codon, "?")  # Use '?' if codon not found

    return {"protein": protein}
