async function testEndpoint() {
    try {
        console.log('Testing http://localhost:5007/api/enquiries...');
        const response = await fetch('http://localhost:5007/api/enquiries', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: 'Test User',
                email: 'test@example.com',
                phone: '1234567890',
                serviceType: 'Web Design',
                message: 'This is a test message from the debug script.'
            })
        });

        console.log('Status:', response.status);
        if (response.ok) {
            const data = await response.json();
            console.log('Success! Response:', data);
        } else {
            const text = await response.text();
            console.log('Error Response:', text);
        }
    } catch (error) {
        console.error('Error:', error.message);
    }
}

testEndpoint();
