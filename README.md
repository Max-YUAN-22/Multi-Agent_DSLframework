# Multi-Agent DSL Framework for Intelligent Task Scheduling

## Overview

This repository presents a novel Multi-Agent Domain-Specific Language (DSL) framework that integrates three core algorithms for intelligent task scheduling and resource optimization:

- **ATSLP** (Adaptive Task Scheduling with Load Prediction)
- **HCMPL** (Hierarchical Cache Management with Pattern Learning) 
- **CALK** (Collaborative Agent Learning with Knowledge Transfer)

## Paper

- **Main Paper**: `FINAL_PAPER_GENERATED.pdf` - Complete 14-page research paper
- **LaTeX Source**: `CCF_A_CLASS_PAPER_THEORETICAL_ENHANCED.tex` - Source code for the paper
- **References**: `references.bib` - Bibliography file

## Core Implementation

### Algorithms
- `novel_algorithms.py` - Implementation of ATSLP, HCMPL, and CALK algorithms
- `scheduler.py` - Task scheduling engine
- `radix_cache.py` - Cache management system
- `dsl.py` - Domain-specific language framework
- `base_agent.py` - Base agent implementation

### Formal Verification
- `atslp_coq.v` - Coq verification for ATSLP algorithm
- `calk_coq.v` - Coq verification for CALK algorithm  
- `hcmpl_isabelle.thy` - Isabelle verification for HCMPL algorithm

## Experimental Data

- `data/comprehensive_experimental_data.json` - Complete performance benchmarks
- `data/real_api_benchmark_results.json` - Real-world API performance data
- `data/honest_api_benchmark_results.json` - Honest performance measurements
- `data/real_cache_performance.json` - Cache performance analysis

## Results

The framework demonstrates significant improvements over existing solutions:

- **Throughput**: 2.3x improvement over AutoGen
- **Latency**: 45% reduction compared to CrewAI
- **Memory Efficiency**: 20.90 MB vs 85.95 MB (AutoGen)
- **Success Rate**: 98.7% task completion rate

## Requirements

See `requirements.txt` for Python dependencies.

## License

MIT License - see `LICENSE` file for details.

## Contact

Max Yuan - [Your Email]

## Acknowledgments

We would like to express our sincere gratitude to Prof. Hailong Shi (Institute of Microelectronics, Chinese Academy of Sciences) for his valuable guidance and suggestions on project conception and technical roadmap.

感谢石海龙教授（中科院微电子所）在项目构思和技术路线方面提供的宝贵指导和建议。