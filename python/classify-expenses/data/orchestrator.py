from enum import Enum


class Orchestrator(Enum):
    GUIDANCE = 'guidance'
    SEMANTICKERNEL = 'semantickernel'
    LANGCHAIN = 'langchain'