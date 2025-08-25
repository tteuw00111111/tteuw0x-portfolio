## JWT

Used for **authorizations**, only after a user has successfully authenticated.

A JWT isn't just one long string of random characters. It's actually made up of three distinct parts, separated by dots:

1. **Header:** This first part contains metadata about the token itself. It typically includes two things: the type of token (which is "JWT") and the signing algorithm being used, like HMAC SHA256 or RSA. This information is then Base64Url encoded to form the first part of the JWT.
2. **Payload:** This is the heart of the JWT. It contains the "claims," which are statements about an entity (typically, the user) and additional data. There are registered claims (like `iss` for issuer, `exp` for expiration time), public claims, and private claims. Just like the header, the payload is Base64Url encoded to form the second part of the JWT.
3. **Signature:** This is where the security comes in. The signature is created by taking the encoded header, the encoded payload, a secret key, and running them through the algorithm specified in the header.

So, a JWT looks like this: `[encoded header].[encoded payload].[signature]`

Here’s an example of what a JWT looks like.
`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjE3MjM5OTk5OTl9.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c`

---

### 1. Header (Decoded)

The first part, `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9`, decodes to this JSON object:

```JSON
{
  "alg": "HS256",
  "typ": "JWT"
}
```

- `alg`: This specifies the algorithm used for the signature, in this case, HMAC using SHA-256.
- `typ`: This just declares the type, which is "JWT".

### 2. Payload (Decoded)

The middle part, `eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjE3MjM5OTk5OTl9`, decodes to:

```JSON
{
  "sub": "1234567890",
  "name": "John Doe",
  "iat": 1516239022,
  "exp": 1723999999
}
```

- `sub`: This is the "subject" of the token, usually the user's ID.
- `name`: A custom piece of information about the user.
- `iat`: Stands for "issued at," a timestamp of when the token was created.
- `exp`: Stands for "expiration," a timestamp for when the token becomes invalid.

### 3. Signature

The final part, `SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c`, is the **signature**.

Now, let's connect this to your third question about security. The header and payload are just encoded, not encrypted. Anyone can decode them and read the information.
