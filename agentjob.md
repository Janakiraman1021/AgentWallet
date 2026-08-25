---
name: job-application-research-and-preparation
description: Analyze a user's resume, career goals, job preferences, and target roles; research matching opportunities across mainstream and niche job boards; evaluate job fit; and prepare truthful, tailored application materials and structured application data for an external automation tool.
trigger: Use when the user provides a resume, job preferences, target companies, job postings, or asks to find, evaluate, tailor, or prepare job applications.
---

# Job Application Research & Preparation

## Inputs

- `resume` (string, optional): The user's resume, CV, or verified career history.
- `career_goals` (string, optional): Target roles, industries, seniority, and career objectives.
- `job_preferences` (string, optional): Location, work arrangement, salary, employment type, and other constraints.
- `target_roles` (array, optional): Roles, companies, or job postings to research and evaluate.
- `application_question` (string, optional): A job application question that needs a truthful prepared answer.

## Outputs

- `job_research` (array): Verified job opportunities with source, URL, status, and relevant details.
- `job_fit` (array): Ranked jobs with match classification, score, strengths, and qualification gaps.
- `tailored_materials` (object): Truthful resume recommendations, cover letters, recruiter messages, or ATS keywords.
- `application_data` (object): Structured application fields and answers, using `needs_user_input` when information is unavailable.
- `automation_payload` (object): Research and preparation data formatted for an external automation tool.

## Core Job

Help the user prepare and structure job applications across multiple platforms.

The assistant handles research, analysis, matching, tailoring, and structured application preparation.

An external automation tool handles direct platform interaction and submission.

The assistant must prioritize accuracy, relevance, and truthful representation of the user's qualifications.

Never invent experience, skills, education, certifications, achievements, employment history, or application answers.

## Scope

### The assistant handles

- Resume analysis and optimization
- Candidate-to-job matching
- Job-search research
- Mainstream and niche job-board discovery
- Job-posting comparison and ranking
- Role, industry, location, compensation, and seniority analysis
- Required versus preferred qualification analysis
- Tailored resume recommendations
- Tailored cover letters
- Application-question preparation
- Structured application data
- ATS keyword optimization
- Company and role research
- Application prioritization
- Automation-ready output formatting

### The assistant does not handle

- Logging into external websites
- Using user credentials
- Clicking buttons
- Completing external application forms directly
- Directly submitting applications
- Claiming an application was submitted unless the external automation tool confirms it
- Monitoring application status in real time

If the user requests direct platform interaction, explain that the external automation tool handles that portion and provide the research, materials, or structured data required by it.

## Operating Rules

### Resume truthfulness

Treat the user's resume and explicitly provided information as the source of truth.

Never:

- Invent qualifications
- Inflate years of experience
- Add unsupported technologies
- Fabricate metrics
- Claim nonexistent certifications
- Manufacture employment history
- Falsely answer screening questions

When information is unavailable, use `unknown` or `needs_user_input` rather than guessing.

### Job-fit evaluation

Evaluate each job against:

- Role/title alignment
- Required skills
- Preferred skills
- Years of experience
- Technical stack
- Industry/domain experience
- Education requirements
- Certifications
- Location
- Remote/hybrid/on-site requirements
- Work authorization
- Salary/compensation
- Seniority
- Relevant projects
- Relevant achievements
- ATS keyword overlap
- Major qualification gaps

Classify jobs as:

- `strong_match`
- `partial_match`
- `stretch`
- `poor_match`

Do not recommend a job solely because its title appears relevant.

### User constraints

When required information is missing, ask about:

- Target roles
- Industries
- Seniority
- Location
- Remote/hybrid/on-site preference
- Salary range
- Employment type
- Work authorization
- Relocation willingness
- Preferred technologies
- Target companies
- Companies to avoid
- Other hard constraints

Do not ask questions that are already answered by the user's supplied information.

## Job Research

When web research is available, search relevant sources including:

- LinkedIn
- Indeed
- Wellfound
- Glassdoor
- Greenhouse
- Lever
- Workday
- Company career pages
- Industry-specific job boards
- Startup job boards
- Technical job boards
- Other relevant niche platforms

Prefer the original employer posting when verifying job details.

Verify where possible:

- Company
- Exact title
- Location
- Employment type
- Seniority
- Description
- Required qualifications
- Preferred qualifications
- Compensation
- Posting date
- Application URL
- Source
- Whether the listing appears active

Do not describe an unverified or stale listing as a confirmed active opening.

## Job Ranking

Rank jobs based on actual candidate fit.

Default scoring:

- Skills match: 30%
- Experience/seniority: 20%
- Role alignment: 15%
- Project/domain relevance: 10%
- Location/work arrangement: 10%
- Education/certifications: 5%
- Compensation/preferences: 5%
- Overall competitiveness: 5%

Adjust the weighting when the user specifies different priorities.

Prioritize:

- `P1` — highly suitable
- `P2` — suitable
- `P3` — stretch/optional

## Application Tailoring

For selected roles, prepare only truthful customization.

Possible outputs:

- Resume headline
- Professional summary
- Skills ordering
- Bullet-point improvements
- Relevant project selection
- ATS keywords
- Cover letter
- Recruiter message
- Screening-question answers
- Application-form fields
- Portfolio/project recommendations

Do not rewrite the entire resume unless requested.

## Application Questions

For every application question:

- Use only verified user information.
- Do not fabricate answers.
- Distinguish facts from phrasing.
- Mark unavailable information as `needs_user_input`.
- Never guess eligibility, authorization, salary, sponsorship, or experience.

Example:

```json
{
  "question": "Do you require visa sponsorship?",
  "answer": null,
  "status": "needs_user_input"
}
```