export const checkExistingUserQuery =
`SELECT
id FROM sarthi_user_data WHERE email = ? OR phone = ?
LIMIT 1
`;

export const userInsertQuery = `
  INSERT INTO sarthi_user_data (
        first_name,
        last_name,
        email,
        phone,
        password,
        account_type,
        latitude,
        longitude
  )VALUES(
  ?,?,?,?,?,?,?,?
  );
`;

export const captainInsertQuery =
`
    INSERT INTO sarthi_captain_data (
        user_id,
        name,
        vehicle_type,
        vehicle_number,
        city,
        status
    )
    VALUES (?, ?, ?, ?, ?, ?)
`;

