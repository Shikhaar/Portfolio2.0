# OCR Backend System Overview

This document provides a high-level overview of the OCR extraction backend. It is designed to be used as a source for creating presentation slides, visualizing processes, flows, and the technology stack.

---

## 1. Roles Catered
- **End-Users / Clients**: Systems or applications calling the APIs to extract UIDs from images (e.g., mobile apps used by field workers).
- **Administrators (Superusers)**: Manage users, tiers, and system configurations.
- **System Services**: Background workers handling tasks and caching via Redis.

---

## 2. Tech Stack & Modules
- **Core Framework**: Python (>=3.11), FastAPI (Async APIs), Pydantic V2 (Data validation).
- **Database Layer**: MySQL (via `aiomysql`), SQLAlchemy 2.0 (ORM), Alembic (Migrations).
- **Caching & Queues**: Redis (Client-side & Server-side caching), ARQ (Async Job Queues).
- **OCR Engine**: DeepInfra Cloud API.
- **Server & Deployment**: Uvicorn, Docker, Docker Compose, NGINX (Load Balancing/Reverse Proxy).
- **HTTP Client**: `httpx` for async external API calls.

---

## 3. Models Used
- **Primary Vision LLM**: `nvidia/Nemotron-Parse-1.1` (hosted via DeepInfra).
- **Fallback / Legacy**: PaddleOCR (mentioned in architecture for backup parsing).
- **Prompt Engineering**: Uses specific control tokens (`<predict_markdown>`) to instruct the LLM to return clean structured text, avoiding XML bounding-box noise.

---

## 4. Data Types Catered
- **Inputs**: 
  - Image references (`image_id`).
  - Image files (JPEG, PNG, WEBP) fetched dynamically from external storage (live retrieval).
- **Outputs**: 
  - Structured JSON containing the extracted Unique Identifier (UID) strings.
- **Nature of Data**: Static textual labels on physical hardware components (Batteries, Chargers, Controllers, Motors, IoT devices).

---

## 5. API Sets
The system exposes specialized REST endpoints for different hardware components:
- `GET /api/v1/battery/extract-battery-uid`
- `GET /api/v1/charger/extract-charger-uid`
- `GET /api/v1/controller/extract-controller-uid`
- `GET /api/v1/iot/extract-iot-number`
- `GET /api/v1/motor/extract-motor-uid`

*Note: Additional administrative APIs (Login, Users, Tiers, Rate Limits) are provided by the boilerplate foundation.*

---

## 6. Pipelines and Flows

### End-to-End User Flow
1. **Request Initiation**: Client sends an HTTP GET request with an `image_id` to a specific component endpoint.
2. **Image Retrieval**: The backend dynamically fetches the image bytes from a remote storage URL using async HTTP requests.
3. **MIME Type Detection**: Analyzes the raw bytes to determine the image format (JPEG, PNG, WEBP).
4. **OCR Processing**: 
   - Image is Base64 encoded.
   - A specialized prompt is constructed based on the selected LLM.
   - Payload is sent asynchronously to the DeepInfra API.
5. **Data Cleanup**: Raw LLM response is stripped of Markdown formatting and XML tags.
6. **Domain-Specific Extraction**: The cleaned text lines are passed through component-specific extraction algorithms (Regex + Heuristics).
7. **Response**: A JSON payload containing the `image_id` and the `extracted_uid` is returned to the client.

---

## 7. Processes & Flows to Improve Retrieval Accuracy
To ensure high accuracy from noisy OCR data, the system implements multi-layered filtering:

1. **Prompt Optimization**: Instructs the LLM to return unformatted raw text.
2. **Response Sanitization**: Strips Markdown headers, tables, and bounding box artifacts (`<class>` tags).
3. **Noise Word Filtering**: Discards irrelevant operational text found on hardware labels (e.g., "VOLTAGE", "INPUT", "OUTPUT", "COMPLAINTS", "LECTRIX").
4. **Targeted Prefix Matching**: Identifies valid UIDs using component-specific prefixes (e.g., `TK-`, `C-` for batteries; `ODY-`, `M` for motors).
5. **Format Validation (Regex)**:
   - **IoT**: Searches for exact 15-digit IMEI sequences, even attempting to merge adjacent numeric tokens.
   - **Controller/Motor**: Applies complex regex patterns to match specific alphanumeric alphanumeric strings.
6. **Heuristic Selection**: If multiple candidates are found, the system scores them based on length, presence of preferred prefixes, and alphanumeric density to select the most probable UID.
