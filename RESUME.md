# Approved resume integration

The owner approved the revised two-page English resume and About portrait on 24 November 2026. The exact approved PDF is at `public/documents/Pedro_Silva_Resume.pdf`; `profile.resume` points to `/documents/Pedro_Silva_Resume.pdf`. Navigation, contact and `/resume/` offer native downloads. No PDF regeneration or content edits were made during integration.

Editable DOCX and generation source remain in ignored `qa/phase54/`. Future replacements require content approval, copying the approved PDF to the same path, rebuilding and testing downloads. Setting `profile.resume` back to null restores the pending fallback.

Owner-requested corrections removed the launch-pending label, simplified the education date and English level, and standardized Sonae’s location to Porto. The portfolio URL is now a hyperlink; this is not a claim that deployment has occurred. Public deployment and push remain unauthorized.
