async function testSignup() {
  try {
    const res = await fetch('http://localhost:8000/api/users/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        fullName: 'ravikumar',
        email: 'ravikumar9581907192@gmail.com',
        password: 'password123',
        age: 20,
        height: 125,
        weight: 65,
        gender: 'male',
        activityLevel: 'light'
      })
    });
    const text = await res.text();
    console.log('Status:', res.status);
    console.log('Response:', text);
  } catch (err) {
    console.log('Error:', err.message);
  }
}

testSignup();
