# GNS CORE — COMPLETE STABILIZATION AND PRODUCTION-READINESS PROMPT

## Role

You are a senior product engineer, backend engineer, frontend engineer, security engineer, DevOps engineer, and QA engineer.

Continue from the current GNS repository state.

The system already includes a working multi-tenant notification platform with FastAPI, Next.js, application credentials, tenants, applications, events with JSON Schema, templates, transactional outbox, workers, retries, DLQ concepts, provider configuration, audit logs, Docker Compose, RBAC, OIDC boundary, notification APIs, and GNS API keys.

The objective is to make **GNS Core fully usable, stable, secure, and production-ready** for IITDEVELOPER applications.

Do not add GNS Engage.AI, campaigns, inbox, conversations, or AI workflows in this task.

---

## 1. Primary Objective

Fix all current product gaps so a new customer can complete this flow without using the database or manually copying hidden IDs:

```text
Create tenant
→ Create application
→ Register event
→ Create and publish template
→ Configure and verify provider
→ Create application credential
→ Send notification
→ View status and delivery attempts
→ Retry or diagnose failures
```

The final system must support this flow from the UI and documented APIs.

---

## 2. Mandatory Engineering Rules

- Do not rewrite working modules unnecessarily.
- Use the existing repository as the source of truth.
- Do not create new microservices.
- Keep the current modular-monolith architecture.
- Preserve tenant and application isolation.
- Never weaken security to make a test pass.
- Never store provider secrets in plaintext.
- Never expose secrets after creation.
- Do not mark mock-only behavior as production-ready.
- Do not claim real provider validation unless it was actually tested.
- Record all migrations and architecture decisions.
- Fix root causes, not only frontend symptoms.

---

## 3. First Required Step — Repository Audit

Before changing code:

1. Read all `.agent/` files.
2. Read existing PRD, FRD, HLD, LLD, security, deployment, and operations documentation.
3. Inspect `git status`, current branch, recent commits, Alembic history, current database URL, and current tests.
4. Run backend tests, frontend tests, Ruff, strict mypy, frontend lint, frontend type check, and frontend production build.
5. Create `docs/GNS_CORE_STABILIZATION_MATRIX.md`.

The matrix must contain:

```text
Requirement
Current state
Evidence
Implementation files
Tests
Remaining work
Priority
External blocker
```

Do not continue based only on previous summaries.

---

## 4. Fix Database and Migration Discipline

The repository previously had a model/schema mismatch where `provider_configs.fallback_provider_id` existed in the SQLAlchemy model but not in the database migration.

Requirements:

- Ensure every current SQLAlchemy model field exists in Alembic migrations.
- Generate explicit migrations for missing fields.
- Test migration from an empty database, the latest previous migration, and a realistic existing database snapshot.
- Verify against PostgreSQL.
- SQLite may remain for local development, but PostgreSQL is the production source of truth.
- Add CI migration verification.
- Add schema-drift detection where practical.
- Never rewrite released migrations.

Fix Python packaging so these commands work:

```bash
uv sync
uv run alembic upgrade head
uv run pytest
```

Use explicit package discovery, a `src/` layout, or include/exclude rules.

---

## 5. Admin Identity and RBAC

Preserve development identity headers only when:

```text
ALLOW_DEV_IDENTITY=true
ENVIRONMENT=development|test
```

Production must refuse to start if development identity is enabled.

Supported roles:

- `platform_admin`
- `tenant_admin`
- `application_admin`
- `template_editor`
- `template_publisher`
- `operations_viewer`
- `operations_operator`
- `auditor`

Add explicit tenant permissions:

- `tenants:read`
- `tenants:create`
- `tenants:update`
- `tenants:disable`
- `tenants:archive`

Rules:

- only `platform_admin` creates or archives top-level tenants
- `tenant_admin` manages its own tenant
- `application_admin` manages only its assigned application scope

Complete production OIDC verification: issuer, audience, signature, expiry, required claims, role mapping, tenant/application scope mapping, JWKS caching, and safe failure behavior.

---

## 6. Fix Tenant and Application Onboarding UX

Replace manual text fields for `tnt_...` and `app_...` values with selectors.

### Tenant selector

- Fetch tenants available to the current administrator.
- Display tenant names.
- Store IDs internally.
- Allow search.
- Include `Create tenant`.
- Auto-select a newly created tenant.
- Persist selection in URL or local storage.
- Validate persisted selection after database reset or logout.
- Clear stale IDs automatically.
- Show a clear empty state.

### Application selector

- Fetch applications for the selected tenant.
- Display application names.
- Store IDs internally.
- Include `Create application`.
- Auto-select newly created application.
- Clear selection when tenant changes.
- Detect deleted or stale IDs.
- Never show only `Application not found` without recovery actions.

Create a guided onboarding flow:

```text
Tenant
→ Application
→ Event
→ Template
→ Provider
→ Credential
→ Test notification
```

Show completion status for each step.

---

## 7. Event Management

Support:

- create
- read
- list
- update
- disable
- archive
- schema versioning
- compatibility validation
- allowed-channel policy
- recipient policy
- sample payload
- test validation
- clear errors

Use event key formats such as:

```text
user.welcome
appointment.reminder
payment.receipt
password.reset
```

---

## 8. Template Workflow

Make this distinction explicit:

```text
active != published
```

Use clear states:

- draft
- validated
- published
- deprecated
- archived

Required actions:

- create draft
- edit draft
- validate
- preview
- test send
- publish immutable version
- create next version
- rollback
- deprecate
- archive

UX requirements:

- Publish disabled until validation succeeds.
- Show exact reason when disabled.
- Refresh state after validation.
- Show `Published v1`, `Published v2`, and so on.
- Prevent ambiguous duplicates for the same event/channel/locale/variant.
- Allow archiving unused drafts.
- Show sample-data and template-variable errors clearly.

---

## 9. Provider Management — Major Required Fix

Provider management must support:

- pre-save connection test
- register provider
- edit public configuration
- replace secret
- test existing provider
- activate
- deactivate
- set as default
- configure fallback
- archive safely
- view health details
- view last test result
- view exact normalized failure reason

---

## 10. Pre-Save Provider Connection Test

Add:

```http
POST /api/v1/provider-configs/test-connection
```

This endpoint tests a configuration without saving it.

SMTP example:

```json
{
  "provider_type": "smtp",
  "channel": "email",
  "public_config": {
    "host": "mail.iitdeveloper.com",
    "port": 465,
    "security": "ssl",
    "username": "info@iitdeveloper.com",
    "from_email": "info@iitdeveloper.com"
  },
  "secret_config": {
    "password": "write-only-value"
  }
}
```

Requirements:

- authorized admin only
- tenant/application scope enforced
- rate limited
- short timeout
- password never persisted
- password never logged
- safe normalized response
- audit event without secret
- DNS/connectivity test
- TLS validation
- authentication test
- optional sender validation where supported

Normalized error codes:

- `CONFIG_INVALID`
- `SMTP_DNS_FAILED`
- `SMTP_CONNECTION_FAILED`
- `SMTP_TIMEOUT`
- `SMTP_TLS_FAILED`
- `SMTP_AUTH_FAILED`
- `SMTP_SENDER_REJECTED`
- `SMTP_PROVIDER_ERROR`
- `SECRET_DECRYPTION_FAILED`

UI flow:

```text
Enter configuration
→ Test connection
→ Show exact result
→ Enable Register provider only after successful test
```

---

## 11. SMTP Adapter Fixes

Support:

- SSL/TLS on port 465
- STARTTLS
- authentication
- configurable timeout
- username
- password
- authenticated sender
- reply-to
- HTML
- text alternative
- safe attachments
- provider message ID where available
- normalized errors

Use one documented secret structure:

```json
{
  "password": "..."
}
```

Ensure frontend, API model, encryption layer, and adapter use the same field name.

Add tests proving the password is accepted, encrypted, decrypted correctly, never returned, and never logged.

---

## 12. Provider Edit and Secret Replacement

Add or complete endpoints:

```http
GET    /api/v1/provider-configs/{provider_id}
PATCH  /api/v1/provider-configs/{provider_id}
POST   /api/v1/provider-configs/{provider_id}/replace-secret
POST   /api/v1/provider-configs/{provider_id}/test
POST   /api/v1/provider-configs/{provider_id}/activate
POST   /api/v1/provider-configs/{provider_id}/deactivate
POST   /api/v1/provider-configs/{provider_id}/set-default
DELETE /api/v1/provider-configs/{provider_id}
```

Rules:

- Public configuration can be edited.
- Secret fields remain write-only.
- Editing or replacing secret sets health to `unknown`.
- Activation requires `healthy`.
- Invalid providers cannot be activated.
- Default provider must be active and healthy.

---

## 13. Safe Provider Archive

Provider archive must be available from the UI.

Behavior:

- invalid and unused provider may be archived immediately
- active provider must be deactivated first
- default provider must be replaced or unset
- fallback dependencies must be removed
- historical notification references must remain
- secret material must be destroyed or revoked
- archive action must be audited

UI actions per provider:

- Test
- Edit
- Replace secret
- Activate/Deactivate
- Set default
- Archive

---

## 14. Provider Health State Model

Use:

- `unknown`
- `healthy`
- `degraded`
- `invalid`
- `unavailable`
- `archived`

Store:

- last test timestamp
- last success
- last failure
- last error code
- safe diagnostic message
- consecutive failures
- test latency
- secret version used

Do not expose raw exceptions or secrets.

---

## 15. Provider Selection Rules

Implement and test:

```text
Application-specific active healthy provider
→ use it

No app provider
→ use global default only when policy allows

App provider exists but is invalid
→ return app_provider_unavailable

App provider authentication fails
→ do not silently switch sender/provider

Temporary unavailability
→ use fallback only when explicit policy allows
```

Fallback must not bypass sender identity, SPF/DKIM/DMARC rules, application policy, compliance, or channel capability requirements.

---

## 16. Application Credentials

Support:

- create
- show secret once
- hash at rest
- scopes
- expiry
- last used
- rotation with overlap
- revocation
- audit

Add UI guidance warning users not to paste secrets into chat, screenshots, logs, or source control.

Add an HTTP Bearer security scheme to Swagger so the **Authorize** button works and generated requests include:

```http
Authorization: Bearer gns_...
```

---

## 17. Notification API Contract

Choose one consistent design.

Recommended:

- derive `application_id` from the application credential
- remove or make `app_id` optional
- if supplied, it must match the credential scope
- mismatch returns `application_scope_mismatch`

Never trust arbitrary `app_id` from the request body.

Support:

- event key
- channel
- recipient
- data
- locale
- variant
- priority
- metadata
- scheduled time
- correlation ID

Idempotency scope:

```text
tenant_id + application_id + idempotency_key
```

Behavior:

- identical retry returns original result
- different payload with same key returns conflict
- concurrent duplicates create one logical notification

---

## 18. Test Notification UI

Add a `Send test notification` flow.

The form should:

- select published event/template
- enter recipient
- provide sample data
- generate unique idempotency key
- call the real notification API
- show notification ID
- show live status
- show delivery attempt timeline
- show provider selection
- show normalized failure reason

Users should not need curl for basic validation.

---

## 19. Notifications Operations UI

Implement:

- list
- filters
- status
- channel
- application
- event
- safe recipient display
- provider
- created time
- scheduled time
- search by notification ID
- detail page
- attempt timeline
- retry
- cancel
- DLQ replay
- audit timeline

Use a documented state model such as:

```text
accepted
scheduled
queued
processing
provider_accepted
sent
delivered
deferred
bounced
complained
failed
cancelled
dead_lettered
```

Do not claim delivered/opened/clicked unless the provider supplies reliable data.

---

## 20. Error Handling

Standardize errors:

```json
{
  "error": {
    "code": "stable_machine_code",
    "message": "Safe human-readable message",
    "details": [],
    "request_id": "req_..."
  }
}
```

Document common 4xx and 5xx responses so Swagger does not show `Undocumented`.

---

## 21. Frontend UX Requirements

Every screen must include:

- loading state
- empty state
- success state
- validation state
- authorization state
- recoverable error state
- stale context recovery

Do not show only `Failed to fetch`.

Display:

- error code
- safe message
- request ID
- suggested action

---

## 22. Observability

Verify:

- request IDs
- correlation IDs
- structured logs
- tenant-safe metrics
- provider test metrics
- provider latency
- queue depth
- queue age
- retry metrics
- DLQ metrics
- notification acceptance latency
- worker processing latency
- SMTP failure classifications
- OpenTelemetry trace propagation

Avoid PII and high-cardinality metric labels.

---

## 23. Security Verification

Create:

```text
docs/GNS_CORE_SECURITY_VERIFICATION.md
```

Test:

- cross-tenant denial
- cross-application denial
- invalid role rejection
- API-key hashing
- API-key revocation
- application scope mismatch
- secret encryption
- secret masking
- no secrets in logs
- provider test rate limiting
- password write-only behavior
- template sandbox escape resistance
- webhook SSRF
- callback forgery
- replay protection
- idempotency conflict
- rate-limit bypass
- CORS
- dev identity disabled in production
- stale local-storage recovery
- provider archive dependency checks

---

## 24. Testing Requirements

Backend unit tests:

- role permissions
- tenant permissions
- API-key generation/verification
- secret encryption/decryption
- SMTP validation
- SMTP error normalization
- provider health transitions
- provider selection
- archive rules
- notification scope validation
- idempotency

Integration tests:

- clean migration
- upgrade migration
- tenant creation
- application creation
- event creation
- template publish
- SMTP pre-test
- provider registration
- provider edit
- secret replacement
- activation
- archive
- credential creation
- notification acceptance
- worker processing
- retry
- DLQ
- status retrieval

Frontend tests:

- tenant selector
- application selector
- stale-ID recovery
- onboarding wizard
- template workflow
- provider pre-test
- provider edit
- provider archive
- secret display-once
- test notification
- error rendering

Playwright E2E:

```text
Create tenant
→ Create application
→ Create event
→ Create template
→ Validate
→ Publish
→ Test provider
→ Register
→ Activate
→ Create credential
→ Send test notification
→ View timeline
```

---

## 25. Local Provider Testing

Add Mailpit or MailHog as an optional Docker Compose profile.

Test email send, HTML/text, recipient, subject, provider result, and final notification state.

Use local mock servers for webhook, SMS, Telegram, WhatsApp, and push.

Do not require real credentials in CI.

---

## 26. Deployment Readiness

Provide:

- working Dockerfiles
- Docker Compose
- environment reference
- health and readiness checks
- migration job
- API/worker/scheduler/outbox commands
- backup/restore
- log rotation
- restart policy
- non-root containers
- production config validation

Netlify may host the admin UI, but long-running API/workers must use a container-capable host.

---

## 27. Documentation

Create or update:

```text
README.md
docs/GNS_CORE_STABILIZATION_MATRIX.md
docs/architecture.md
docs/api.md
docs/admin-onboarding.md
docs/provider-management.md
docs/smtp-setup.md
docs/template-workflow.md
docs/credentials.md
docs/send-first-notification.md
docs/security.md
docs/GNS_CORE_SECURITY_VERIFICATION.md
docs/testing.md
docs/deployment.md
docs/operations.md
docs/troubleshooting.md
docs/release-checklist.md
CHANGELOG.md
```

Include safe examples for IITDEVELOPER onboarding, `user.welcome`, SMTP, credentials, curl, and provider diagnostics.

---

## 28. Definition of Done

This stabilization release is complete only when:

1. Tenant can be created from UI.
2. Tenant/application selectors work without manual IDs.
3. Stale IDs recover automatically.
4. Application onboarding works end-to-end.
5. Event validation works.
6. Template draft, validate, preview, publish, and history work.
7. Provider connection can be tested before registration.
8. SMTP failures return specific reasons.
9. Provider can be edited.
10. Provider secret can be replaced.
11. Provider can be activated/deactivated.
12. Provider can be safely archived from UI.
13. Invalid providers cannot be activated.
14. Healthy provider can send a test email.
15. Credentials can be created, rotated, and revoked.
16. Swagger Bearer authorization works.
17. Notification API enforces credential application scope.
18. Idempotency works.
19. Worker processes notifications.
20. Delivery attempts and status are visible.
21. Retry and DLQ paths are tested.
22. Cross-tenant and cross-app tests pass.
23. Alembic matches all models.
24. `uv sync` works.
25. Docker Compose starts the local stack.
26. CI passes.
27. No secrets appear in logs or responses.
28. Documentation allows a new developer to send a notification without source-code inspection.

---

## 29. Execution Order

```text
1. Audit
2. Database/migrations/packaging
3. Tenant/application onboarding UX
4. Template workflow UX
5. Provider pre-test and diagnostics
6. Provider edit/secret/archive
7. Credential and Swagger auth
8. Notification API scope/idempotency
9. Test notification UI
10. Operations UI
11. Security verification
12. E2E tests
13. Deployment validation
14. Documentation
```

After each milestone:

- run tests
- update the matrix
- update `.agent/PROJECT_STATE.md`
- update `.agent/TASKS.md`
- update `.agent/EXECUTION_PLAN.md`
- commit
- continue automatically

Stop only when the definition of done is met or the only remaining work requires unavailable real provider credentials or external infrastructure.

---

## 30. Final Report

Create:

```text
docs/GNS_CORE_STABILIZATION_REPORT.md
```

Include:

- completed features
- fixed bugs
- migration status
- packaging status
- provider management status
- SMTP validation status
- notification E2E status
- test counts
- coverage
- lint/type/build status
- Docker status
- security verification
- live provider tests
- mock tests
- limitations
- blockers
- commit list
- exact next actions

Begin now by auditing the repository and creating the stabilization matrix.
