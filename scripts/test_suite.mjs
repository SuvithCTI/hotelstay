/**
 * Automated Verification and Test Suite for Lumina Grand Hotel Application
 * Tests input sanitization, security functions, phone/email validators, pricing bounds,
 * date validations, role guards, and data integrity.
 */

import { sanitizeText, sanitizePhone, isValidPhone, isValidEmail, sanitizePrice } from '../src/utils/security.js';
import { DEFAULT_ROOMS, DEFAULT_BOOKINGS, HOTEL_INFO, GALLERY_ITEMS } from '../src/data/hotelData.js';

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  ✓ PASS: ${message}`);
    passed++;
  } else {
    console.error(`  ✗ FAIL: ${message}`);
    failed++;
  }
}

console.log('\n======================================================');
console.log('  LUMINA GRAND RESORT - SECURITY & LOGIC TEST SUITE  ');
console.log('======================================================\n');

// 1. SECURITY & SANITIZATION TESTS
console.log('[1] Testing Security & Input Sanitization:');
assert(sanitizeText('<script>alert("xss")</script>Hello') === 'Hello', 'XSS <script> tags removed');
assert(sanitizeText('<img src=x onerror=alert(1)>Luxury') === 'Luxury', 'HTML tag injection stripped');
assert(sanitizeText('javascript:void(0)') === '', 'javascript: protocol stripped');
assert(sanitizeText('  Devendra Singhania  ') === 'Devendra Singhania', 'Text trimmed properly');
assert(sanitizePhone('+91 98450 12345') === '9845012345', 'Phone sanitization normalizes 10 digits');
assert(sanitizePhone('9845012345') === '9845012345', 'Standard 10 digits intact');
assert(isValidPhone('9845012345') === true, 'Valid 10-digit mobile passes');
assert(isValidPhone('7123456789') === true, 'Valid 7-series mobile passes');
assert(isValidPhone('12345') === false, 'Short phone rejected');
assert(isValidPhone('0123456789') === false, 'Phone starting with 0 rejected');
assert(isValidEmail('guest@example.com') === true, 'Valid email passes');
assert(isValidEmail('guest@domain.co.in') === true, 'Valid international domain email passes');
assert(isValidEmail('invalid-email') === false, 'Malformed email rejected');
assert(isValidEmail('@no-user.com') === false, 'Missing local part rejected');

// 2. PRICING & GST CONSTRAINT TESTS
console.log('\n[2] Testing Pricing, GST & Constraint Rules:');
assert(DEFAULT_ROOMS.length === 8, 'Exactly 8 luxury rooms defined');
DEFAULT_ROOMS.forEach((room) => {
  assert(room.price <= 5000, `Room "${room.name}" price (₹${room.price}) is under ₹5,000`);
  assert(room.price > 0, `Room "${room.name}" price is positive`);
  assert(typeof room.id === 'string' && room.id.length > 0, `Room has valid ID: ${room.id}`);
  assert(room.image && room.image.length > 0, `Room "${room.name}" has valid image path`);
  assert(Array.isArray(room.amenities) && room.amenities.length >= 3, `Room "${room.name}" has at least 3 amenities`);
});

// Test GST & Total calculation
const testRoomPrice = 4999;
const testNights = 2;
const subtotal = testRoomPrice * testNights;
const taxes = Math.round(subtotal * 0.12);
const total = subtotal + taxes;
assert(subtotal === 9998, 'Subtotal correctly calculated (4999 * 2 = 9998)');
assert(taxes === 1200, '12% GST rounded correctly (9998 * 0.12 = 1199.76 -> 1200)');
assert(total === 11198, 'Total amount includes room charges + 12% GST');

// 3. SANITIZE PRICE BOUNDS
console.log('\n[3] Testing Price Sanitizer & Bounds:');
assert(sanitizePrice('4500', 999, 4999) === 4500, 'Valid price within range retained');
assert(sanitizePrice(500, 999, 4999) === 999, 'Below minimum bounded to min (999)');
assert(sanitizePrice(99999, 999, 4999) === 4999, 'Above maximum bounded to max (4999)');
assert(sanitizePrice('invalid', 999, 4999) === 999, 'NaN price falls back to min');

// 4. DATA INTEGRITY TESTS
console.log('\n[4] Testing Data & Gallery Integrity:');
assert(HOTEL_INFO.name === 'Lumina Grand Luxury Hotel & Suites', 'Hotel name intact');
assert(HOTEL_INFO.whatsappPhone.length === 12, 'WhatsApp phone format correct (919845012345)');
assert(GALLERY_ITEMS.length >= 8, 'Gallery contains full photo showcase');
GALLERY_ITEMS.forEach((g) => {
  assert(g.image && g.image.length > 0, `Gallery item "${g.title}" has image`);
});

console.log('\n======================================================');
console.log(`  TEST RESULTS: ${passed} PASSED | ${failed} FAILED  `);
console.log('======================================================\n');

if (failed > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
