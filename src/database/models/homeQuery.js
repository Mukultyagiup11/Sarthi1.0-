export const checkIntroQuery= `
  SELECT user_id,intro_completed FROM sarthi_user_intro_journey
   WHERE user_id =?
`;


export const checkIntroQuery1= `
  SELECT user_id,intro_completed FROM sarthi_user_intro_journey
   WHERE user_id =? AND intro_completed = '1'
`;
export const updateIntroJourneyOfAUser = `
    INSERT INTO sarthi_user_intro_journey (
        user_id,
        intro_completed,
        completed_at
    )
    VALUES (?, ?, ?)
`;

export const completeIntroJourneyQuery = `
    UPDATE sarthi_user_intro_journey
    SET intro_completed = TRUE,
        completed_at = NOW()
    WHERE user_id = ?
`;

