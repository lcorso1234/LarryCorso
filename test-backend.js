#!/usr/bin/env node

/**
 * Backend API Test Script
 * Run this to test your backend endpoints
 */

const API_BASE = "http://localhost:3000/api";

async function testHealthEndpoint() {
  try {
    const response = await fetch(`${API_BASE}/health`);
    const data = await response.json();
    console.log("✅ Health Check:", data);
  } catch (error) {
    console.log("❌ Health Check Failed:", error.message);
  }
}

async function testAdminLogin(password) {
  try {
    const response = await fetch(`${API_BASE}/admin/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password }),
    });

    const data = await response.json();

    if (response.ok) {
      console.log("✅ Admin Login Successful");

      // Extract token from Set-Cookie header for further requests
      const cookies = response.headers.get("set-cookie");
      if (cookies) {
        const tokenMatch = cookies.match(/admin-token=([^;]+)/);
        if (tokenMatch) {
          return tokenMatch[1];
        }
      }
    } else {
      console.log("❌ Admin Login Failed:", data);
    }
  } catch (error) {
    console.log("❌ Admin Login Error:", error.message);
  }
  return null;
}

async function testPagesAPI(token) {
  try {
    const response = await fetch(`${API_BASE}/admin/pages`, {
      headers: {
        Cookie: `admin-token=${token}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      console.log(
        "✅ Pages API:",
        `Found ${data.pages ? Object.keys(data.pages).length : 0} pages`
      );
    } else {
      console.log("❌ Pages API Failed:", response.status);
    }
  } catch (error) {
    console.log("❌ Pages API Error:", error.message);
  }
}

async function runTests() {
  console.log("🧪 Testing Backend APIs...\n");

  // Test health endpoint
  await testHealthEndpoint();

  // Get admin password from environment
  const adminPassword = process.env.ADMIN_PASSWORD || "test-password";

  // Test admin login
  const token = await testAdminLogin(adminPassword);

  if (token) {
    // Test authenticated endpoints
    await testPagesAPI(token);
  }

  console.log("\n✨ Backend tests completed!");
}

// Only run if this file is executed directly
if (require.main === module) {
  runTests();
}

module.exports = { testHealthEndpoint, testAdminLogin, testPagesAPI };
