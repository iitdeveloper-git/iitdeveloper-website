# GNS IN-APP NOTIFICATIONS — COMPLETE IMPLEMENTATION PROMPT

## Role

You are a senior product engineer, backend engineer, frontend engineer, real-time systems engineer, SDK engineer, security engineer, DevOps engineer, and QA engineer.

Your task is to add a complete **In-App Notifications** capability to the existing GNS platform.

This feature must integrate cleanly with the current GNS architecture and must not break existing email, SMS, webhook, push, Telegram, or WhatsApp channels.

The implementation must remain compatible with the current modular-monolith design.

---

# 1. Product Objective

Build a production-ready in-app notification system that allows applications to:

- Send real-time in-app notifications to users
- Show toast notifications
- Store notifications in a notification center
- Track read/unread state
- Support actions and deep links
- Target users, roles, groups, tenants, and applications
- Support priority and expiry
- Deliver notifications through WebSocket or Server-Sent Events
- Provide React/Next.js SDKs and UI components
- Preserve delivery history and auditability
- Support offline users and reconnect behavior

The final user experience should support:

```text
Business event
→ GNS creates in-app notification
→ notification is stored
→ connected user receives real-time event
→ toast is shown
→ notification remains available in notification center
→ user opens or dismisses it
→ read state is synchronized
```

---

# 2. Core Product Principle

A toast is only a temporary presentation layer.

The actual product must include:

```text
In-App Notification Channel
├── Durable notification record
├── Real-time delivery
├── Toast presentation
├── Notification bell
├── Notification center
├── Read/unread state
├── User preferences
└── Audit and analytics
```

Important notifications must never disappear permanently only because a toast auto-dismissed.

---

# 3. Scope

## Included in V1

- In-app notification channel
- Durable storage
- User targeting
- Role targeting
- Tenant/application scope
- Real-time delivery
- Toast component
- Notification bell
- Notification center
- Read/unread state
- Mark one as read
- Mark all as read
- Notification actions
- Deep links
- Priority
- Expiry
- Deduplication
- Reconnect handling
- React/Next.js SDK
- API documentation
- Tests
- Security
- Admin visibility

## Not included in V1

- Native iOS SDK
- Native Android SDK
- Browser push
- Complex workflow builder
- AI-generated notifications
- Cross-product shared inbox
- Advanced recommendation engine
- Rich drag-and-drop notification designer
- End-user notification rule builder

Prepare extension points for these future features without implementing them now.

---

# 4. Integration with Existing GNS

Add `in_app` as a first-class GNS channel.

Example channel list:

```text
email
sms
push
webhook
telegram
whatsapp
in_app
```

The in-app channel must use the same:

- Tenant model
- Application model
- Event model
- Template model
- Idempotency model
- Outbox
- Worker model
- Audit model
- Notification lifecycle
- API credentials
- RBAC
- Observability
- Retry rules

Do not create a separate unrelated notification system.

---

# 5. High-Level Architecture

```text
Client Application Backend
        |
        | POST notification event
        v
GNS API
        |
        +-> Validate tenant/application/event/template
        |
        +-> Store notification + recipient targets
        |
        +-> Transactional outbox
        |
        v
In-App Notification Worker
        |
        +-> Store delivery record
        |
        +-> Publish real-time event
        |
        v
Real-Time Gateway
        |
        +-> WebSocket or SSE connection
        |
        v
Client SDK
        |
        +-> Toast
        +-> Notification Bell
        +-> Notification Center
        +-> Read/Unread sync
```

Recommended V1 transport:

- Prefer **SSE** if server-to-client delivery is enough
- Use **WebSocket** if bidirectional low-latency behavior is required

Choose one as the primary transport and document the reason.

Recommended starting choice:

```text
SSE for V1
```

Why:

- Simpler infrastructure
- Easier load balancing
- Automatic browser reconnect
- Server-to-client delivery is the primary need
- Read/unread actions can use normal HTTP APIs

Prepare a transport abstraction so WebSocket can be added later.

---

# 6. Data Model

Add entities or equivalent models for:

## InAppNotification

Fields:

- `id`
- `tenant_id`
- `application_id`
- `event_key`
- `template_version_id`
- `title`
- `message`
- `severity`
- `priority`
- `action_payload`
- `metadata`
- `expires_at`
- `created_at`
- `updated_at`
- `archived_at`
- `deduplication_key`
- `correlation_id`

## NotificationRecipient

Fields:

- `id`
- `notification_id`
- `recipient_type`
- `recipient_id`
- `tenant_id`
- `application_id`
- `delivered_at`
- `read_at`
- `dismissed_at`
- `opened_at`
- `archived_at`
- `delivery_status`
- `delivery_attempt_count`
- `created_at`
- `updated_at`

Supported recipient types:

```text
user
role
group
tenant
application
```

## InAppConnection

Optional ephemeral storage:

- `connection_id`
- `user_id`
- `tenant_id`
- `application_id`
- `session_id`
- `connected_at`
- `last_seen_at`
- `transport`
- `device_id`

Prefer Redis for live connection state.

## NotificationPreference

Fields:

- `user_id`
- `tenant_id`
- `application_id`
- `event_key`
- `in_app_enabled`
- `toast_enabled`
- `sound_enabled`
- `quiet_hours`
- `minimum_priority`
- `created_at`
- `updated_at`

## NotificationDeliveryAttempt

Fields:

- `notification_recipient_id`
- `attempt_number`
- `transport`
- `status`
- `error_code`
- `created_at`
- `completed_at`

---

# 7. Notification Payload Contract

Example notification request:

```json
{
  "event_key": "payment.pending",
  "channel": "in_app",
  "recipient": {
    "type": "user",
    "id": "usr_123"
  },
  "data": {
    "invoice_id": "INV-1024",
    "amount": "2500",
    "currency": "INR"
  },
  "locale": "en",
  "variant": "default",
  "priority": 8,
  "metadata": {
    "source": "billing-service"
  }
}
```

Rendered result:

```json
{
  "id": "ian_123",
  "type": "warning",
  "title": "Payment pending",
  "message": "Invoice INV-1024 is still unpaid.",
  "action": {
    "label": "View invoice",
    "url": "/invoices/INV-1024",
    "type": "deep_link"
  },
  "priority": 8,
  "expires_at": "2026-06-27T10:00:00Z",
  "created_at": "2026-06-26T10:00:00Z",
  "read": false
}
```

---

# 8. Template Model for In-App Notifications

Support in-app templates using fields such as:

```json
{
  "title": "Payment pending",
  "message": "Invoice {{ invoice_id }} is still unpaid.",
  "severity": "warning",
  "action": {
    "label": "View invoice",
    "url": "/invoices/{{ invoice_id }}",
    "type": "deep_link"
  },
  "toast": {
    "enabled": true,
    "auto_dismiss_ms": 6000
  }
}
```

Validation rules:

- `title` required
- `message` required
- `severity` must be valid
- action URL must be relative or allow-listed
- auto-dismiss must be within safe range
- template variables must exist in event schema
- unsafe HTML must be rejected
- arbitrary JavaScript must never be allowed

Supported severity values:

```text
info
success
warning
error
critical
```

---

# 9. Targeting

Support targeting by:

## User

```json
{
  "type": "user",
  "id": "usr_123"
}
```

## Multiple users

```json
{
  "type": "users",
  "ids": ["usr_123", "usr_456"]
}
```

## Role

```json
{
  "type": "role",
  "id": "doctor"
}
```

## Group

```json
{
  "type": "group",
  "id": "finance-team"
}
```

## Tenant-wide

```json
{
  "type": "tenant"
}
```

## Application-wide

```json
{
  "type": "application"
}
```

Rules:

- Recipient scope must match credential scope.
- Cross-tenant targeting must be impossible.
- Role/group membership should be resolved through IAM or application-supplied recipient resolver.
- Large fan-out must use asynchronous expansion.
- Avoid inserting millions of recipient rows in a single transaction.
- Use batching for high-volume targeting.

---

# 10. IAM Integration

GNS must not invent a separate user identity system.

Use the future or existing IAM service for:

- user identity
- tenant membership
- roles
- groups
- permissions
- sessions

Required integration modes:

## Token-based user context

The client SDK connects with a valid access token.

The real-time gateway validates:

- signature
- issuer
- audience
- expiry
- subject
- tenant ID
- application ID
- session ID

## Recipient resolution

GNS may:

- call IAM to resolve role/group members
- consume IAM membership events
- maintain a synchronized recipient index

Do not trust user IDs supplied by the browser without validating the authenticated principal.

---

# 11. Real-Time API

## SSE endpoint

Recommended:

```http
GET /api/v1/in-app/stream
Authorization: Bearer <user-access-token>
Accept: text/event-stream
```

Event format:

```text
event: notification.created
id: ian_123
data: {...}
```

Additional event types:

```text
notification.created
notification.updated
notification.read
notification.dismissed
notification.archived
connection.ready
heartbeat
```

Requirements:

- authenticated connection
- tenant/application isolation
- heartbeat
- reconnect support
- `Last-Event-ID` support
- missed-event replay
- connection timeout handling
- graceful shutdown
- rate limits
- maximum connections per user/session
- connection metrics
- stale connection cleanup

---

# 12. HTTP APIs

Create versioned APIs.

## User APIs

```http
GET    /api/v1/in-app/notifications
GET    /api/v1/in-app/notifications/{id}
POST   /api/v1/in-app/notifications/{id}/read
POST   /api/v1/in-app/notifications/{id}/unread
POST   /api/v1/in-app/notifications/{id}/dismiss
POST   /api/v1/in-app/notifications/read-all
GET    /api/v1/in-app/unread-count
GET    /api/v1/in-app/preferences
PATCH  /api/v1/in-app/preferences
```

## Admin APIs

```http
GET    /api/v1/admin/in-app/notifications
POST   /api/v1/admin/in-app/test
GET    /api/v1/admin/in-app/delivery-attempts
GET    /api/v1/admin/in-app/connections
```

All APIs must support:

- pagination
- filtering
- stable error format
- request IDs
- authorization
- tenant/application scope
- OpenAPI documentation
- tests

---

# 13. Read/Unread Semantics

Define behavior clearly.

## Delivered

The notification exists for the user.

## Displayed

The client received it and rendered it.

## Opened

The user clicked or opened the notification.

## Read

The user explicitly marked it read, or policy marks it read on open.

## Dismissed

The toast was closed or the notification hidden from the active list.

Dismissed does not necessarily mean read.

## Archived

The notification is removed from active history but retained according to policy.

Use explicit timestamps:

- `delivered_at`
- `displayed_at`
- `opened_at`
- `read_at`
- `dismissed_at`
- `archived_at`

---

# 14. Offline and Reconnect Behavior

If the user is offline:

- Store notification durably.
- Do not mark delivered to client.
- Deliver when the user reconnects.
- Replay missed events using last event ID or cursor.
- Notification center must always fetch from source-of-truth API.

Do not rely only on real-time events.

The SDK startup flow should be:

```text
1. Fetch unread count
2. Fetch recent notifications
3. Connect SSE
4. Reconcile missed events
5. Subscribe to new events
```

---

# 15. Deduplication

Support deduplication.

Recommended scope:

```text
tenant_id
+ application_id
+ recipient_id
+ deduplication_key
```

Behavior:

- Same key and same semantic payload returns existing notification.
- Same key and different payload returns conflict.
- Concurrent duplicate events create one logical notification.
- Deduplication retention must be configurable.

Example:

```text
payment-pending-INV-1024
```

---

# 16. Priority

Support numeric priority:

```text
1–10
```

Recommended mapping:

```text
1–3 = low
4–6 = normal
7–8 = high
9–10 = critical
```

Priority affects:

- toast persistence
- ordering
- sound
- badge count
- delivery urgency
- quiet-hour override
- visual treatment

Critical notifications must not automatically bypass user preferences unless policy explicitly allows it.

---

# 17. Expiry

Support `expires_at`.

Behavior:

- expired notifications are not shown as active
- expired notifications remain auditable
- expiry is checked before delivery
- expired pending notifications are skipped
- expiry cleanup runs in bounded background jobs

---

# 18. User Preferences

Support user preferences:

- in-app enabled
- toast enabled
- sound enabled
- quiet hours
- minimum priority
- event-level subscription
- category-level subscription

Preferences may be constrained by application policy.

Example:

- Security alerts cannot be fully disabled.
- Marketing notifications may be disabled.
- Critical operational notices may ignore quiet hours only if explicitly allowed.

---

# 19. React/Next.js SDK

Create a reusable package.

Recommended package:

```text
@iitdeveloper/gns-in-app
```

Capabilities:

- initialize client
- authenticate with access token
- connect to SSE
- reconnect automatically
- fetch notifications
- fetch unread count
- mark read
- mark all read
- dismiss
- manage preferences
- expose hooks
- expose headless APIs
- expose UI components
- handle token refresh callback
- handle multi-tab synchronization

Recommended hooks:

```ts
useGnsNotifications()
useGnsUnreadCount()
useGnsNotificationStream()
useGnsNotificationPreferences()
```

Recommended components:

```tsx
<GnsProvider />
<GnsToastContainer />
<GnsNotificationBell />
<GnsNotificationCenter />
<GnsNotificationItem />
```

The SDK must not force one UI library.

Provide:

- headless core
- optional styled components
- CSS variables
- theme support

---

# 20. Toast Component

Toast requirements:

- severity styling
- title
- message
- timestamp
- action button
- dismiss button
- auto-dismiss
- persistent mode
- keyboard accessible
- screen-reader accessible
- responsive
- stacked notifications
- maximum visible toast count
- duplicate suppression
- animation with reduced-motion support

Recommended behavior:

- low/normal: auto-dismiss
- high: longer timeout
- critical: persistent until action/dismiss

Never render arbitrary HTML.

---

# 21. Notification Bell

The bell should display:

- unread badge
- capped count such as `99+`
- loading state
- empty state
- real-time updates
- keyboard accessibility
- tooltip
- click opens notification center

The unread count must be server-authoritative.

---

# 22. Notification Center

Required UI:

- notification list
- unread filter
- all filter
- severity filter
- category filter
- date filter
- search
- infinite scroll or pagination
- mark one read
- mark all read
- dismiss
- deep-link action
- empty state
- loading state
- error state

Notification item should show:

- severity icon
- title
- message
- time
- read/unread state
- action
- metadata label where useful

---

# 23. Multi-Tab Synchronization

If the same user has multiple tabs open:

- only one notification should create one toast per tab policy
- read state should synchronize
- unread count should synchronize
- dismissal should synchronize

Use:

- `BroadcastChannel`
- local storage events as fallback

Document expected behavior.

---

# 24. Delivery Tracking

Track:

- created
- queued
- delivered to gateway
- pushed to active connection
- acknowledged by SDK
- displayed
- opened
- read
- dismissed
- expired
- failed

Do not confuse server delivery with user read.

SDK acknowledgement endpoint:

```http
POST /api/v1/in-app/notifications/{id}/ack
```

Example:

```json
{
  "status": "displayed",
  "device_id": "web-abc",
  "session_id": "ses_123"
}
```

---

# 25. Admin Console

Add an In-App Notifications section.

Pages:

## Dashboard

- notifications created
- active connections
- delivered
- displayed
- opened
- read
- dismissed
- expired
- failed
- average delivery latency
- unread backlog

## Templates

- create in-app template
- preview toast
- preview notification center item
- validate
- test
- publish

## Test notification

- choose application
- choose user/role/group
- choose event
- enter sample data
- send
- observe status

## Connections

- current connections
- application
- tenant
- user
- session
- connected time
- last heartbeat
- transport

## Notification detail

- payload
- recipient
- delivery attempts
- timestamps
- read/open state
- errors
- audit trail

---

# 26. Security

Mandatory:

- authenticated real-time connection
- token validation
- tenant/application isolation
- recipient ownership validation
- no arbitrary recipient impersonation
- deep-link allowlist
- no arbitrary JavaScript
- no unsafe HTML
- rate limiting
- connection limits
- event size limits
- metadata size limits
- audit privileged actions
- PII-safe logs
- no access tokens in query strings
- secure CORS
- secure headers
- protection against replay
- protection against connection hijacking
- token expiry handling
- forced disconnect after token/session revocation

---

# 27. Performance and Scale

Design for:

- many simultaneous SSE connections
- burst notification delivery
- offline replay
- tenant isolation
- batching
- backpressure
- bounded memory
- Redis pub/sub or streams
- horizontal API/gateway scaling

Do not make unverified scale claims.

Provide load tests for:

- 1,000 concurrent connections
- burst of 10,000 notifications
- reconnect storm
- unread-count endpoint
- notification list pagination
- mark-all-read
- role targeting fan-out

Record actual results only when tests are run.

---

# 28. Observability

Metrics:

- active connections
- connections by application
- reconnects
- connection failures
- notification created count
- delivery latency
- push success/failure
- acknowledgement latency
- unread backlog
- replay count
- expired count
- read/open/dismiss rates

Tracing:

- notification creation
- outbox publish
- worker process
- real-time publish
- client acknowledgement

Avoid user IDs in metric labels.

---

# 29. Testing

## Unit tests

- template validation
- priority mapping
- expiry
- deduplication
- read/unread transitions
- preference rules
- targeting
- recipient resolution
- deep-link validation
- SSE event formatting

## Integration tests

- create in-app notification
- store recipient
- publish through outbox
- deliver through SSE
- reconnect replay
- last event ID
- offline user delivery
- read state
- dismiss
- mark all read
- expiry
- preference enforcement
- cross-tenant denial
- revoked session disconnect

## Frontend tests

- toast rendering
- auto-dismiss
- persistent critical toast
- bell unread count
- notification center
- mark read
- mark all read
- action click
- multi-tab synchronization
- reconnect
- token refresh

## E2E

```text
Login
→ Connect SDK
→ Trigger in-app notification
→ Receive toast
→ Open notification center
→ Mark read
→ Refresh page
→ Confirm state persisted
```

---

# 30. Local Development

Add optional Docker Compose services/configuration for:

- Redis
- API
- worker
- real-time gateway if separated logically
- demo client application

Create a demo app:

```text
examples/nextjs-in-app-demo
```

The demo must show:

- login/token injection
- toast
- bell
- notification center
- test notification button
- mark read
- preferences

---

# 31. Documentation

Create:

```text
docs/in-app-overview.md
docs/in-app-architecture.md
docs/in-app-api.md
docs/in-app-sse.md
docs/in-app-sdk.md
docs/in-app-react.md
docs/in-app-targeting.md
docs/in-app-preferences.md
docs/in-app-security.md
docs/in-app-testing.md
docs/in-app-deployment.md
docs/in-app-troubleshooting.md
```

Include:

- full integration example
- React example
- Next.js example
- curl example
- SSE example
- event payload example
- troubleshooting reconnect issues
- troubleshooting token expiry
- troubleshooting unread count mismatch

---

# 32. Suggested Repository Structure

```text
apps/
├── api/
├── admin-web/
├── worker/
└── demo-nextjs/

packages/
├── in-app-domain/
├── in-app-sdk-core/
├── in-app-sdk-react/
├── shared-types/
└── observability/
```

Do not create packages unless there is a real boundary.

---

# 33. Release Plan

## Release 1

- durable in-app notifications
- user targeting
- SSE
- toast
- bell
- notification center
- read/unread
- React SDK

## Release 1.1

- role/group targeting
- preferences
- quiet hours
- multi-tab sync
- admin analytics

## Release 1.2

- WebSocket transport option
- mobile SDK preparation
- advanced targeting
- digest notifications

---

# 34. Definition of Done

The feature is complete only when:

1. `in_app` exists as a GNS channel.
2. Notifications are stored durably.
3. User targeting is tenant-safe.
4. Authenticated SSE works.
5. Reconnect and missed-event replay work.
6. Offline users receive notifications after reconnect.
7. Toast is shown in real time.
8. Notification remains in notification center.
9. Unread count is correct.
10. Mark read works.
11. Mark all read works.
12. Dismiss works.
13. Actions/deep links work safely.
14. Expiry works.
15. Deduplication works.
16. Preferences work.
17. React/Next.js SDK works.
18. Multi-tab synchronization works.
19. Admin can send a test notification.
20. Delivery status and attempts are visible.
21. Cross-tenant tests pass.
22. Revoked sessions lose connection.
23. No access tokens appear in URLs or logs.
24. Load tests are runnable.
25. Documentation is complete.
26. Demo application works.
27. Existing GNS channels still pass regression tests.

---

# 35. Execution Order

```text
1. Audit existing GNS architecture
2. Define data model and migrations
3. Add in_app channel
4. Implement notification storage
5. Implement SSE gateway
6. Implement user APIs
7. Implement delivery worker
8. Implement acknowledgements
9. Implement preferences
10. Build SDK core
11. Build React components
12. Build admin UI
13. Add demo application
14. Add tests
15. Add security verification
16. Add observability
17. Validate Docker deployment
18. Complete documentation
```

After every milestone:

- run tests
- update `.agent/PROJECT_STATE.md`
- update `.agent/TASKS.md`
- update `.agent/EXECUTION_PLAN.md`
- update architecture decisions
- commit changes
- continue automatically

---

# 36. Final Report

Create:

```text
docs/IN_APP_NOTIFICATIONS_COMPLETION_REPORT.md
```

Include:

- implemented features
- API status
- SSE status
- SDK status
- frontend status
- security verification
- test counts
- coverage
- load-test results
- Docker status
- known limitations
- external blockers
- commit list
- next release recommendations

Begin by auditing the existing GNS repository and producing an implementation matrix before writing code.
