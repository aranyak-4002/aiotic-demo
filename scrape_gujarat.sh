#!/bin/bash
urls=(
  "https://www.google.com/maps/place/Ahmedabad+Clinic/data=!4m7!3m6!1s0x395e84f68d560049:0xfdd496fd4a429c56!8m2!3d23.0459451!4d72.5616891!16s%2Fg%2F11g8_70g80!19sChIJSQBWjfaEXjkRVpxCSv2W1P0?authuser=0&hl=en&rclk=1"
  "https://www.google.com/maps/place/Mahi+clinic+.%7C%7C+Clinic,+MBBS+Doctor,+Best+Doctor,+Hospital+In+Narol/data=!4m7!3m6!1s0x395e8f5a07e8c9b1:0x114f47aea07b5113!8m2!3d22.9447812!4d72.5937999!16s%2Fg%2F11pzk0ks4d!19sChIJscnoB1qPXjkRE1F7oK5HTxE?authuser=0&hl=en&rclk=1"
  "https://www.google.com/maps/place/Ahmedabad+Clinic/data=!4m7!3m6!1s0x395e850aa3f2bad5:0x7fa337ad0ff43a23!8m2!3d23.0119332!4d72.5283667!16s%2Fg%2F11llzn9yw0!19sChIJ1bryowqFXjkRIzr0D603o38?authuser=0&hl=en&rclk=1"
  "https://www.google.com/maps/place/Dhabkar+Super+Speciality+Clinic/data=!4m7!3m6!1s0x395e85903f8565d7:0x659b22c02550a909!8m2!3d23.0065411!4d72.6063848!16s%2Fg%2F11p5qj9_rc!19sChIJ12WFP5CFXjkRCalQJcAim2U?authuser=0&hl=en&rclk=1"
  "https://www.google.com/maps/place/Dr.+Gazala+Clinic/data=!4m7!3m6!1s0x395e85b2d67a6e55:0x5c54dd2c920e8679!8m2!3d23.0172752!4d72.5824647!16s%2Fg%2F11c703b_vr!19sChIJVW561rKFXjkReYYOkizdVFw?authuser=0&hl=en&rclk=1"
  "https://www.google.com/maps/place/Shaleen+Hospital+Multispeciality/data=!4m7!3m6!1s0x395e9d1cdbc6062d:0xd87c3c30a362f219!8m2!3d23.0755426!4d72.5176068!16s%2Fg%2F11g2yytn23!19sChIJLQbG2xydXjkRGfJiozA8fNg?authuser=0&hl=en&rclk=1"
  "https://www.google.com/maps/place/Stree+Clinic/data=!4m7!3m6!1s0x395e8455bc501d53:0xead28114d7f293d3!8m2!3d23.0203099!4d72.5691675!16s%2Fg%2F11bwpv5q81!19sChIJUx1QvFWEXjkR05Py1xSB0uo?authuser=0&hl=en&rclk=1"
  "https://www.google.com/maps/place/Sarvajanik+Clinic+%28%E0%AA%B8%E0%AA%BE%E0%AA%B0%E0%AB%8D%E0%AA%B5%E0%AA%9C%E0%AA%A8%E0%AA%BF%E0%AA%95+%E0%AA%A6%E0%AA%BE%E0%AA%B5%E0%AA%96%E0%AA%BE%E0%AA%A8%E0%AB%81%29/data=!4m7!3m6!1s0x395e8564f232436d:0xdb4e39302e7c2e8a!8m2!3d23.0046145!4d72.5783496!16s%2Fg%2F11v59wd9fc!19sChIJbUMy8mSFXjkRii58LjA5Tts?authuser=0&hl=en&rclk=1"
  "https://www.google.com/maps/place/Shyam+Clinic/data=!4m7!3m6!1s0x395e890735fcf05d:0x220ff7a61b03aa8c!8m2!3d22.9504935!4d72.6221865!16s%2Fg%2F11ry3hc_93!19sChIJXfD8NQeJXjkRjKoDG6b3DyI?authuser=0&hl=en&rclk=1"
  "https://www.google.com/maps/place/vaishvee+ndt+clinic-Ahmedabad/data=!4m7!3m6!1s0x395e8501e7ef2249:0xa924b450f3830280!8m2!3d23.0148417!4d72.563304!16s%2Fg%2F11ggzm62bj!19sChIJSSLv5wGFXjkRgAKD81C0JKk?authuser=0&hl=en&rclk=1"
  "https://www.google.com/maps/place/Ansh+clinic/data=!4m7!3m6!1s0x395e85e14d735697:0x94b344c085cd83f1!8m2!3d22.9911496!4d72.6020323!16s%2Fg%2F11s11hpjdr!19sChIJl1ZzTeGFXjkR8YPNhcBEs5Q?authuser=0&hl=en&rclk=1"
  "https://www.google.com/maps/place/Raj+Clinic+%28+Dr+Shabbir%27s+Raj+clinic%29/data=!4m7!3m6!1s0x395e84551aac0001:0xfd6b91041f05cdd4!8m2!3d23.0180364!4d72.5685398!16s%2Fg%2F1pp2tz3xp!19sChIJAQCsGlWEXjkR1M0FHwSRa_0?authuser=0&hl=en&rclk=1"
  "https://www.google.com/maps/place/Sampann+Clinic+Thaltej+-+Dr+Archin+Patel/data=!4m7!3m6!1s0x395e9b5f9c7ef2e5:0x6efdefba3c6173ba!8m2!3d23.0490168!4d72.5092279!16s%2Fg%2F11j2p0sj72!19sChIJ5fJ-nF-bXjkRunNhPLrv_W4?authuser=0&hl=en&rclk=1"
)
for u in "${urls[@]}"; do
  node scraper/pipeline.js "$u" --city=Gujarat
done
