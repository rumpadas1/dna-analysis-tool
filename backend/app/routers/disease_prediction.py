from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()

# Disease markers (DNA sequences)
disease_markers = {
    "Cystic Fibrosis": "ATCAGT",
    "Sickle Cell Anemia": "GTGGTG",
    "Tay-Sachs": "TACGAC",
    "Huntington's Disease": "CAGCAGCAG",
    "Hemophilia A": "GTTGAG",
    "Thalassemia": "TCATGA",
    "Phenylketonuria": "CTGACT",
    "Duchenne Muscular Dystrophy": "GGATCC",
    "Fragile X Syndrome": "CGGCGGCGG",
    "Alzheimer's Disease": "GACGAC",
    "Marfan Syndrome": "AATGGA",
    "Breast Cancer (BRCA1)": "AGCTGT",
    "Breast Cancer (BRCA2)": "AAGTGG",
    "Prostate Cancer": "GCGCGC",
    "Parkinson's Disease": "GGTGGC"
}

# Fixed values for DNA bases
dna_value_map = {
    'A': 1,
    'C': 2,
    'G': 3,
    'T': 4
}

class DNAInput(BaseModel):
    sequence: str

@router.post("/")
def detect_disease_patterns(data: DNAInput):
    sequence = data.sequence.upper()
    matched = []

    for disease, pattern in disease_markers.items():
        pattern_len = len(pattern)
        pattern_sum = sum(dna_value_map[base] for base in pattern)

        for i in range(len(sequence) - pattern_len + 1):
            window = sequence[i:i+pattern_len]
            window_sum = sum(dna_value_map.get(base, 0) for base in window)

            # Check sum first, then exact order
            if window_sum == pattern_sum and window == pattern:
                matched.append(disease)
                break  # Match found, move to next disease

    return {"matched_diseases": matched}