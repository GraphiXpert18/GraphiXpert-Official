async function reproduceIssue() {
    const loginUrl = 'http://localhost:5007/api/auth/login';
    const enquiriesUrl = 'http://localhost:5007/api/enquiries';

    const credentials = {
        email: 'graphixpert18@gmail.com',
        password: 'graphi@18xpert'
    };

    try {
        console.log('1. Attempting login...');
        const loginRes = await fetch(loginUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials)
        });

        if (!loginRes.ok) {
            throw new Error(`Login failed: ${loginRes.status} ${loginRes.statusText}`);
        }

        const loginData = await loginRes.json();
        console.log('Login successful!');
        const { token, role } = loginData;
        console.log('Token received:', token.substring(0, 10) + '...');
        console.log('User role:', role);

        console.log('\n2. Attempting to fetch enquiries with token...');
        const enquiriesRes = await fetch(enquiriesUrl, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (!enquiriesRes.ok) {
            const text = await enquiriesRes.text();
            throw new Error(`Enquiries fetch failed: ${enquiriesRes.status} ${text}`);
        }

        const enquiriesData = await enquiriesRes.json();
        console.log('Enquiries fetch successful!');
        console.log('Enquiries count:', enquiriesData.length);

    } catch (error) {
        console.error('\nError occurred:', error.message);
    }
}

reproduceIssue();
