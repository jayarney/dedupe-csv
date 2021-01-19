const dedupe = require('./dedupe');

test('dedupe by email address', () => {
  const rows = [
    { FirstName: 'Jello', LastName: 'Biafra', Email: 'jello@biafra.org', PhoneNumber: '425-111-2222' },
    { FirstName: 'Jello', LastName: 'PuddingPop', Email: 'jello@biafra.org', PhoneNumber: '425-111-3333' },
  ];
  const uniqueRows = dedupe(rows, 'email');
  expect(uniqueRows.length).toEqual(1);
});

test('dedupe by phone number', () => {
  const rows = [
    { FirstName: 'Jello', LastName: 'Biafra', Email: 'jello@biafra.org', PhoneNumber: '425-111-2222' },
    { FirstName: 'Jello', LastName: 'PuddingPop', Email: 'jello@puddingpop.org', PhoneNumber: '425-111-2222' },
  ];
  const uniqueRows = dedupe(rows, 'phone');
  expect(uniqueRows.length).toEqual(1);
});

test('dedupe by email and phone number', () => {
  const rows = [
    { FirstName: 'Jello', LastName: 'Biafra', Email: 'jello@biafra.org', PhoneNumber: '425-111-2222' },
    { FirstName: 'Jello', LastName: 'PuddingPop', Email: 'jello@biafra.org', PhoneNumber: '425-111-3333' },
    { FirstName: 'Jello', LastName: 'PuddingPop', Email: 'jello@puddingpop.org', PhoneNumber: '425-111-2222' },
  ];
  const uniqueRows = dedupe(rows, 'email_or_phone');
  expect(uniqueRows.length).toEqual(1);
});

test('throw exception when method not recognized', () => {
  const rows = [
    { FirstName: 'Jello', LastName: 'Biafra', Email: 'jello@biafra.org', PhoneNumber: '425-111-2222' },
    { FirstName: 'Jello', LastName: 'PuddingPop', Email: 'jello@biafra.org', PhoneNumber: '425-111-3333' },
  ];
  expect(() => {
    dedupe(rows, 'ham');
  }).toThrow();
});