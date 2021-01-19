const dedupe = (rows, method) => {
  const uniqueEmail = []
  const uniquePhone = [];

  const uniqueRows = [];
  rows.forEach(row => {
    const isEmailUnique = row.Email === '' || uniqueEmail.indexOf(row.Email) === -1;
    const isPhoneUnique = row.PhoneNumber === '' || uniquePhone.indexOf(row.PhoneNumber) === -1;

    switch (method) {
      case 'email':
        if (isEmailUnique) {
          uniqueRows.push(row);
        }
        break;
      case 'phone':
        if (isPhoneUnique) {
          uniqueRows.push(row);
        }
        break;
      case 'email_or_phone': {
        if (isEmailUnique && isPhoneUnique) {
          uniqueRows.push(row);
        }
        break;
      }
      default: {
        throw new Error(`Invalid method ${method}`);
      }
    }

    // Keep track of these values so we know if we've seen them before
    uniqueEmail.push(row.Email);
    uniquePhone.push(row.PhoneNumber);
  });

  return uniqueRows;
}

module.exports = dedupe;
