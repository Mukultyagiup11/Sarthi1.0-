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

export const loginQuery =
`
 SELECT
 u.id,
 u.first_name,
 u.last_name,
 u.email,
 u.phone,
 u.password,
 u.account_type,
 c.vehicle_type,
 c.vehicle_number,
 c.vehicle_number
 FROM sarthi_user_data AS u
 LEFT JOIN sarthi_captain_data AS c
 ON c.user_id = u.id
 WHERE u.email = ? OR u.phone = ?
 LIMIT 1
`;

export const statusUpdateQuery = 
`
  UPDATE sarthi_captain_data 
  SET status = CASE 
  WHEN status = 'offline' THEN 'available'
  ELSE status
  END
  WHERE user_id = ?
`;