#!/usr/bin/env bash
# Simple deploy helper. Does NOT set environment variables for you.
# Use this locally if you have vercel CLI authenticated and environment vars set
# in your Vercel project.

set -euo pipefail

echo "Deploying to Vercel (production)..."
vercel --prod

echo "Deploy finished. Check Vercel dashboard for logs and URL."
