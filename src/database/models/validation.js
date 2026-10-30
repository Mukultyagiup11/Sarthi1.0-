export const checkExistingUserQuery =
`SELECT
id FROM sarthi_user_data WHERE email = ? OR phone = ?
LIMIT 1
`;

