def test_login_invalid_credentials(client):
    response = client.post("/api/v1/auth/login", json={"email": "x@x.com", "password": "wrong"})
    assert response.status_code == 401
