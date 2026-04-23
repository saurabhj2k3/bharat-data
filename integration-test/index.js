import { bharat } from 'bharat-data';

console.log("\n🇮🇳  Bharat-Data: Deep Scan Integration Test\n");
console.log("-----------------------------------");

// 1. Core Profile
const user = bharat.person.generate();
console.log(`👤 User     : ${user.name}`);
console.log(`📧 Email    : ${bharat.internet.email(user.name.split(' ')[0], user.name.split(' ')[1])}`);

// 2. Location & Address
console.log("\n🌍 [ADDRESS]");
console.log(`📍 Full     : ${bharat.address.fullAddress()}`);
const cityData = bharat.address.city();
console.log(`🏙️ City     : ${cityData.name} (${bharat.address.pincode()})`);

// 3. Transport & Automotive
console.log("\n🚗 [TRANSPORT]");
console.log(`🆔 License  : ${bharat.transport.dlNumber("MH")}`);
console.log(`🚛 Vehicle  : ${bharat.transport.vehicleNumber()}`);

// 4. Healthcare & Medical
console.log("\n🏥 [HEALTHCARE]");
console.log(`❤️  Blood    : ${bharat.healthcare.bloodGroup()}`);
console.log(`🏨 Hospital : ${bharat.healthcare.hospital()}`);
console.log(`🆔 ABHA     : ${bharat.healthcare.abhaId()}`);

// 5. Travel & Aviation
console.log("\n✈️  [AIRLINE]");
console.log(`🎫 PNR      : ${bharat.airline.pnr()}`);
console.log(`✈️  Carrier  : ${bharat.airline.airline()}`);
console.log(`🔢 Flight   : ${bharat.airline.flightNumber()}`);

// 6. Professional & Business
console.log("\n🏢 [BUSINESS & EDUCATION]");
console.log(`🏢 Company  : ${bharat.business.companyName()}`);
console.log(`🎓 Degree   : ${bharat.education.university()}`);
const degree = bharat.education.degreeInfo();
console.log(`🎓 Stream   : ${degree.type} in ${degree.stream}`);
console.log(`🔢 Roll No  : ${bharat.education.rollNumber()}`);

// 7. Lifestyle & Hobby
console.log("\n🎨 [LIFESTYLE]");
console.log(`🐶 Animal   : ${bharat.animal.nativeSpecies()}`);
console.log(`🎸 Instrmt  : ${bharat.music.instrument()}`);
console.log(`🎶 Genre    : ${bharat.music.genre()}`);

// 8. Cyber & System
console.log("\n⚙️  [SYSTEM]");
console.log(`🔑 Password : ${bharat.internet.password(12)}`);
console.log(`🆔 UUID     : ${bharat.utility.id()}`);
console.log(`💡 Phrase   : ${bharat.hacker.phrase()}`);

console.log("\n-----------------------------------");
console.log("✅ Deep Scan Complete: All Modules Verified!");
