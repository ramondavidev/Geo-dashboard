export interface ZipCodeData {
  zipCode: string;
  city: string;
  state: string;
  stateAbbr: string;
}

export const US_ZIP_CODES: ZipCodeData[] = [
  // Alabama
  { zipCode: "35201", city: "Birmingham", state: "Alabama", stateAbbr: "AL" },
  { zipCode: "36101", city: "Montgomery", state: "Alabama", stateAbbr: "AL" },
  { zipCode: "35801", city: "Huntsville", state: "Alabama", stateAbbr: "AL" },
  { zipCode: "36601", city: "Mobile", state: "Alabama", stateAbbr: "AL" },
  
  // Alaska
  { zipCode: "99501", city: "Anchorage", state: "Alaska", stateAbbr: "AK" },
  { zipCode: "99701", city: "Fairbanks", state: "Alaska", stateAbbr: "AK" },
  { zipCode: "99801", city: "Juneau", state: "Alaska", stateAbbr: "AK" },
  
  // Arizona
  { zipCode: "85001", city: "Phoenix", state: "Arizona", stateAbbr: "AZ" },
  { zipCode: "85701", city: "Tucson", state: "Arizona", stateAbbr: "AZ" },
  { zipCode: "85201", city: "Mesa", state: "Arizona", stateAbbr: "AZ" },
  { zipCode: "85224", city: "Chandler", state: "Arizona", stateAbbr: "AZ" },
  { zipCode: "85301", city: "Glendale", state: "Arizona", stateAbbr: "AZ" },
  { zipCode: "85281", city: "Tempe", state: "Arizona", stateAbbr: "AZ" },
  
  // Arkansas
  { zipCode: "72201", city: "Little Rock", state: "Arkansas", stateAbbr: "AR" },
  { zipCode: "72701", city: "Fayetteville", state: "Arkansas", stateAbbr: "AR" },
  { zipCode: "72401", city: "Jonesboro", state: "Arkansas", stateAbbr: "AR" },
  
  // California
  { zipCode: "90210", city: "Beverly Hills", state: "California", stateAbbr: "CA" },
  { zipCode: "90001", city: "Los Angeles", state: "California", stateAbbr: "CA" },
  { zipCode: "94102", city: "San Francisco", state: "California", stateAbbr: "CA" },
  { zipCode: "92101", city: "San Diego", state: "California", stateAbbr: "CA" },
  { zipCode: "95101", city: "San Jose", state: "California", stateAbbr: "CA" },
  { zipCode: "93701", city: "Fresno", state: "California", stateAbbr: "CA" },
  { zipCode: "95814", city: "Sacramento", state: "California", stateAbbr: "CA" },
  { zipCode: "92801", city: "Anaheim", state: "California", stateAbbr: "CA" },
  { zipCode: "92701", city: "Santa Ana", state: "California", stateAbbr: "CA" },
  { zipCode: "91101", city: "Pasadena", state: "California", stateAbbr: "CA" },
  { zipCode: "90401", city: "Santa Monica", state: "California", stateAbbr: "CA" },
  { zipCode: "94301", city: "Palo Alto", state: "California", stateAbbr: "CA" },
  
  // Colorado
  { zipCode: "80201", city: "Denver", state: "Colorado", stateAbbr: "CO" },
  { zipCode: "80901", city: "Colorado Springs", state: "Colorado", stateAbbr: "CO" },
  { zipCode: "80301", city: "Boulder", state: "Colorado", stateAbbr: "CO" },
  { zipCode: "80202", city: "Aurora", state: "Colorado", stateAbbr: "CO" },
  { zipCode: "80501", city: "Longmont", state: "Colorado", stateAbbr: "CO" },
  
  // Connecticut
  { zipCode: "06101", city: "Hartford", state: "Connecticut", stateAbbr: "CT" },
  { zipCode: "06511", city: "New Haven", state: "Connecticut", stateAbbr: "CT" },
  { zipCode: "06901", city: "Stamford", state: "Connecticut", stateAbbr: "CT" },
  { zipCode: "06801", city: "Bridgeport", state: "Connecticut", stateAbbr: "CT" },
  
  // Delaware
  { zipCode: "19901", city: "Dover", state: "Delaware", stateAbbr: "DE" },
  { zipCode: "19801", city: "Wilmington", state: "Delaware", stateAbbr: "DE" },
  { zipCode: "19702", city: "Newark", state: "Delaware", stateAbbr: "DE" },
  
  // Florida
  { zipCode: "33101", city: "Miami", state: "Florida", stateAbbr: "FL" },
  { zipCode: "32801", city: "Orlando", state: "Florida", stateAbbr: "FL" },
  { zipCode: "33601", city: "Tampa", state: "Florida", stateAbbr: "FL" },
  { zipCode: "32501", city: "Pensacola", state: "Florida", stateAbbr: "FL" },
  { zipCode: "32301", city: "Tallahassee", state: "Florida", stateAbbr: "FL" },
  { zipCode: "32601", city: "Gainesville", state: "Florida", stateAbbr: "FL" },
  { zipCode: "33401", city: "West Palm Beach", state: "Florida", stateAbbr: "FL" },
  { zipCode: "33301", city: "Fort Lauderdale", state: "Florida", stateAbbr: "FL" },
  { zipCode: "32201", city: "Jacksonville", state: "Florida", stateAbbr: "FL" },
  { zipCode: "33701", city: "St. Petersburg", state: "Florida", stateAbbr: "FL" },
  
  // Georgia
  { zipCode: "30301", city: "Atlanta", state: "Georgia", stateAbbr: "GA" },
  { zipCode: "31401", city: "Savannah", state: "Georgia", stateAbbr: "GA" },
  { zipCode: "30901", city: "Augusta", state: "Georgia", stateAbbr: "GA" },
  { zipCode: "31201", city: "Macon", state: "Georgia", stateAbbr: "GA" },
  { zipCode: "31701", city: "Albany", state: "Georgia", stateAbbr: "GA" },
  
  // Hawaii
  { zipCode: "96801", city: "Honolulu", state: "Hawaii", stateAbbr: "HI" },
  { zipCode: "96720", city: "Hilo", state: "Hawaii", stateAbbr: "HI" },
  { zipCode: "96701", city: "Aiea", state: "Hawaii", stateAbbr: "HI" },
  
  // Idaho
  { zipCode: "83701", city: "Boise", state: "Idaho", stateAbbr: "ID" },
  { zipCode: "83201", city: "Pocatello", state: "Idaho", stateAbbr: "ID" },
  { zipCode: "83814", city: "Coeur d'Alene", state: "Idaho", stateAbbr: "ID" },
  
  // Illinois
  { zipCode: "60601", city: "Chicago", state: "Illinois", stateAbbr: "IL" },
  { zipCode: "62701", city: "Springfield", state: "Illinois", stateAbbr: "IL" },
  { zipCode: "61601", city: "Peoria", state: "Illinois", stateAbbr: "IL" },
  { zipCode: "61801", city: "Urbana", state: "Illinois", stateAbbr: "IL" },
  { zipCode: "62901", city: "Carbondale", state: "Illinois", stateAbbr: "IL" },
  
  // Indiana
  { zipCode: "46201", city: "Indianapolis", state: "Indiana", stateAbbr: "IN" },
  { zipCode: "46801", city: "Fort Wayne", state: "Indiana", stateAbbr: "IN" },
  { zipCode: "47401", city: "Bloomington", state: "Indiana", stateAbbr: "IN" },
  { zipCode: "47901", city: "Lafayette", state: "Indiana", stateAbbr: "IN" },
  { zipCode: "47708", city: "Evansville", state: "Indiana", stateAbbr: "IN" },
  
  // Iowa
  { zipCode: "50301", city: "Des Moines", state: "Iowa", stateAbbr: "IA" },
  { zipCode: "52240", city: "Iowa City", state: "Iowa", stateAbbr: "IA" },
  { zipCode: "50701", city: "Waterloo", state: "Iowa", stateAbbr: "IA" },
  { zipCode: "52001", city: "Dubuque", state: "Iowa", stateAbbr: "IA" },
  
  // Kansas
  { zipCode: "66101", city: "Kansas City", state: "Kansas", stateAbbr: "KS" },
  { zipCode: "67201", city: "Wichita", state: "Kansas", stateAbbr: "KS" },
  { zipCode: "66044", city: "Lawrence", state: "Kansas", stateAbbr: "KS" },
  { zipCode: "66502", city: "Manhattan", state: "Kansas", stateAbbr: "KS" },
  
  // Kentucky
  { zipCode: "40201", city: "Louisville", state: "Kentucky", stateAbbr: "KY" },
  { zipCode: "40601", city: "Frankfort", state: "Kentucky", stateAbbr: "KY" },
  { zipCode: "40502", city: "Lexington", state: "Kentucky", stateAbbr: "KY" },
  { zipCode: "42101", city: "Bowling Green", state: "Kentucky", stateAbbr: "KY" },
  
  // Louisiana
  { zipCode: "70112", city: "New Orleans", state: "Louisiana", stateAbbr: "LA" },
  { zipCode: "70801", city: "Baton Rouge", state: "Louisiana", stateAbbr: "LA" },
  { zipCode: "71101", city: "Shreveport", state: "Louisiana", stateAbbr: "LA" },
  { zipCode: "70501", city: "Lafayette", state: "Louisiana", stateAbbr: "LA" },
  
  // Maine
  { zipCode: "04101", city: "Portland", state: "Maine", stateAbbr: "ME" },
  { zipCode: "04401", city: "Bangor", state: "Maine", stateAbbr: "ME" },
  { zipCode: "04330", city: "Augusta", state: "Maine", stateAbbr: "ME" },
  
  // Maryland
  { zipCode: "21201", city: "Baltimore", state: "Maryland", stateAbbr: "MD" },
  { zipCode: "21401", city: "Annapolis", state: "Maryland", stateAbbr: "MD" },
  { zipCode: "20850", city: "Rockville", state: "Maryland", stateAbbr: "MD" },
  { zipCode: "21742", city: "Hagerstown", state: "Maryland", stateAbbr: "MD" },
  
  // Massachusetts
  { zipCode: "02101", city: "Boston", state: "Massachusetts", stateAbbr: "MA" },
  { zipCode: "01201", city: "Pittsfield", state: "Massachusetts", stateAbbr: "MA" },
  { zipCode: "01101", city: "Springfield", state: "Massachusetts", stateAbbr: "MA" },
  { zipCode: "01606", city: "Worcester", state: "Massachusetts", stateAbbr: "MA" },
  { zipCode: "02138", city: "Cambridge", state: "Massachusetts", stateAbbr: "MA" },
  
  // Michigan
  { zipCode: "48201", city: "Detroit", state: "Michigan", stateAbbr: "MI" },
  { zipCode: "49501", city: "Grand Rapids", state: "Michigan", stateAbbr: "MI" },
  { zipCode: "48933", city: "Lansing", state: "Michigan", stateAbbr: "MI" },
  { zipCode: "48104", city: "Ann Arbor", state: "Michigan", stateAbbr: "MI" },
  { zipCode: "49684", city: "Traverse City", state: "Michigan", stateAbbr: "MI" },
  
  // Minnesota
  { zipCode: "55101", city: "Saint Paul", state: "Minnesota", stateAbbr: "MN" },
  { zipCode: "55401", city: "Minneapolis", state: "Minnesota", stateAbbr: "MN" },
  { zipCode: "55812", city: "Duluth", state: "Minnesota", stateAbbr: "MN" },
  { zipCode: "56001", city: "Mankato", state: "Minnesota", stateAbbr: "MN" },
  
  // Mississippi
  { zipCode: "39201", city: "Jackson", state: "Mississippi", stateAbbr: "MS" },
  { zipCode: "39501", city: "Gulfport", state: "Mississippi", stateAbbr: "MS" },
  { zipCode: "38601", city: "Tupelo", state: "Mississippi", stateAbbr: "MS" },
  { zipCode: "39402", city: "Hattiesburg", state: "Mississippi", stateAbbr: "MS" },
  
  // Missouri
  { zipCode: "63101", city: "St. Louis", state: "Missouri", stateAbbr: "MO" },
  { zipCode: "64101", city: "Kansas City", state: "Missouri", stateAbbr: "MO" },
  { zipCode: "65201", city: "Columbia", state: "Missouri", stateAbbr: "MO" },
  { zipCode: "65801", city: "Springfield", state: "Missouri", stateAbbr: "MO" },
  
  // Montana
  { zipCode: "59101", city: "Billings", state: "Montana", stateAbbr: "MT" },
  { zipCode: "59601", city: "Helena", state: "Montana", stateAbbr: "MT" },
  { zipCode: "59701", city: "Butte", state: "Montana", stateAbbr: "MT" },
  { zipCode: "59801", city: "Missoula", state: "Montana", stateAbbr: "MT" },
  
  // Nebraska
  { zipCode: "68101", city: "Omaha", state: "Nebraska", stateAbbr: "NE" },
  { zipCode: "68501", city: "Lincoln", state: "Nebraska", stateAbbr: "NE" },
  { zipCode: "69101", city: "North Platte", state: "Nebraska", stateAbbr: "NE" },
  
  // Nevada
  { zipCode: "89101", city: "Las Vegas", state: "Nevada", stateAbbr: "NV" },
  { zipCode: "89501", city: "Reno", state: "Nevada", stateAbbr: "NV" },
  { zipCode: "89701", city: "Carson City", state: "Nevada", stateAbbr: "NV" },
  
  // New Hampshire
  { zipCode: "03101", city: "Manchester", state: "New Hampshire", stateAbbr: "NH" },
  { zipCode: "03301", city: "Concord", state: "New Hampshire", stateAbbr: "NH" },
  { zipCode: "03755", city: "Hanover", state: "New Hampshire", stateAbbr: "NH" },
  
  // New Jersey
  { zipCode: "07101", city: "Newark", state: "New Jersey", stateAbbr: "NJ" },
  { zipCode: "08608", city: "Trenton", state: "New Jersey", stateAbbr: "NJ" },
  { zipCode: "07030", city: "Hoboken", state: "New Jersey", stateAbbr: "NJ" },
  { zipCode: "08540", city: "Princeton", state: "New Jersey", stateAbbr: "NJ" },
  { zipCode: "07001", city: "Avenel", state: "New Jersey", stateAbbr: "NJ" },
  
  // New Mexico
  { zipCode: "87101", city: "Albuquerque", state: "New Mexico", stateAbbr: "NM" },
  { zipCode: "87501", city: "Santa Fe", state: "New Mexico", stateAbbr: "NM" },
  { zipCode: "88001", city: "Las Cruces", state: "New Mexico", stateAbbr: "NM" },
  { zipCode: "87401", city: "Farmington", state: "New Mexico", stateAbbr: "NM" },
  
  // New York
  { zipCode: "10001", city: "New York", state: "New York", stateAbbr: "NY" },
  { zipCode: "12201", city: "Albany", state: "New York", stateAbbr: "NY" },
  { zipCode: "14201", city: "Buffalo", state: "New York", stateAbbr: "NY" },
  { zipCode: "13201", city: "Syracuse", state: "New York", stateAbbr: "NY" },
  { zipCode: "14608", city: "Rochester", state: "New York", stateAbbr: "NY" },
  { zipCode: "11501", city: "Mineola", state: "New York", stateAbbr: "NY" },
  { zipCode: "10801", city: "New Rochelle", state: "New York", stateAbbr: "NY" },
  
  // North Carolina
  { zipCode: "28201", city: "Charlotte", state: "North Carolina", stateAbbr: "NC" },
  { zipCode: "27601", city: "Raleigh", state: "North Carolina", stateAbbr: "NC" },
  { zipCode: "27101", city: "Winston-Salem", state: "North Carolina", stateAbbr: "NC" },
  { zipCode: "27401", city: "Greensboro", state: "North Carolina", stateAbbr: "NC" },
  { zipCode: "28801", city: "Asheville", state: "North Carolina", stateAbbr: "NC" },
  
  // North Dakota
  { zipCode: "58501", city: "Bismarck", state: "North Dakota", stateAbbr: "ND" },
  { zipCode: "58102", city: "Fargo", state: "North Dakota", stateAbbr: "ND" },
  { zipCode: "58201", city: "Grand Forks", state: "North Dakota", stateAbbr: "ND" },
  
  // Ohio
  { zipCode: "43215", city: "Columbus", state: "Ohio", stateAbbr: "OH" },
  { zipCode: "44101", city: "Cleveland", state: "Ohio", stateAbbr: "OH" },
  { zipCode: "45202", city: "Cincinnati", state: "Ohio", stateAbbr: "OH" },
  { zipCode: "45402", city: "Dayton", state: "Ohio", stateAbbr: "OH" },
  { zipCode: "44503", city: "Youngstown", state: "Ohio", stateAbbr: "OH" },
  { zipCode: "43604", city: "Toledo", state: "Ohio", stateAbbr: "OH" },
  
  // Oklahoma
  { zipCode: "73102", city: "Oklahoma City", state: "Oklahoma", stateAbbr: "OK" },
  { zipCode: "74103", city: "Tulsa", state: "Oklahoma", stateAbbr: "OK" },
  { zipCode: "73801", city: "Woodward", state: "Oklahoma", stateAbbr: "OK" },
  { zipCode: "74701", city: "Durant", state: "Oklahoma", stateAbbr: "OK" },
  
  // Oregon
  { zipCode: "97201", city: "Portland", state: "Oregon", stateAbbr: "OR" },
  { zipCode: "97301", city: "Salem", state: "Oregon", stateAbbr: "OR" },
  { zipCode: "97401", city: "Eugene", state: "Oregon", stateAbbr: "OR" },
  { zipCode: "97701", city: "Bend", state: "Oregon", stateAbbr: "OR" },
  
  // Pennsylvania
  { zipCode: "19101", city: "Philadelphia", state: "Pennsylvania", stateAbbr: "PA" },
  { zipCode: "15201", city: "Pittsburgh", state: "Pennsylvania", stateAbbr: "PA" },
  { zipCode: "17101", city: "Harrisburg", state: "Pennsylvania", stateAbbr: "PA" },
  { zipCode: "16501", city: "Erie", state: "Pennsylvania", stateAbbr: "PA" },
  { zipCode: "18015", city: "Bethlehem", state: "Pennsylvania", stateAbbr: "PA" },
  
  // Rhode Island
  { zipCode: "02901", city: "Providence", state: "Rhode Island", stateAbbr: "RI" },
  { zipCode: "02840", city: "Newport", state: "Rhode Island", stateAbbr: "RI" },
  { zipCode: "02886", city: "Warwick", state: "Rhode Island", stateAbbr: "RI" },
  
  // South Carolina
  { zipCode: "29201", city: "Columbia", state: "South Carolina", stateAbbr: "SC" },
  { zipCode: "29401", city: "Charleston", state: "South Carolina", stateAbbr: "SC" },
  { zipCode: "29601", city: "Greenville", state: "South Carolina", stateAbbr: "SC" },
  { zipCode: "29501", city: "Florence", state: "South Carolina", stateAbbr: "SC" },
  
  // South Dakota
  { zipCode: "57101", city: "Sioux Falls", state: "South Dakota", stateAbbr: "SD" },
  { zipCode: "57701", city: "Rapid City", state: "South Dakota", stateAbbr: "SD" },
  { zipCode: "57501", city: "Pierre", state: "South Dakota", stateAbbr: "SD" },
  
  // Tennessee
  { zipCode: "37201", city: "Nashville", state: "Tennessee", stateAbbr: "TN" },
  { zipCode: "38103", city: "Memphis", state: "Tennessee", stateAbbr: "TN" },
  { zipCode: "37402", city: "Chattanooga", state: "Tennessee", stateAbbr: "TN" },
  { zipCode: "37901", city: "Knoxville", state: "Tennessee", stateAbbr: "TN" },
  
  // Texas
  { zipCode: "75201", city: "Dallas", state: "Texas", stateAbbr: "TX" },
  { zipCode: "77002", city: "Houston", state: "Texas", stateAbbr: "TX" },
  { zipCode: "78701", city: "Austin", state: "Texas", stateAbbr: "TX" },
  { zipCode: "78205", city: "San Antonio", state: "Texas", stateAbbr: "TX" },
  { zipCode: "76101", city: "Fort Worth", state: "Texas", stateAbbr: "TX" },
  { zipCode: "79401", city: "Lubbock", state: "Texas", stateAbbr: "TX" },
  { zipCode: "79901", city: "El Paso", state: "Texas", stateAbbr: "TX" },
  { zipCode: "77901", city: "Victoria", state: "Texas", stateAbbr: "TX" },
  { zipCode: "77801", city: "Bryan", state: "Texas", stateAbbr: "TX" },
  
  // Utah
  { zipCode: "84101", city: "Salt Lake City", state: "Utah", stateAbbr: "UT" },
  { zipCode: "84601", city: "Provo", state: "Utah", stateAbbr: "UT" },
  { zipCode: "84401", city: "Ogden", state: "Utah", stateAbbr: "UT" },
  { zipCode: "84501", city: "Price", state: "Utah", stateAbbr: "UT" },
  
  // Vermont
  { zipCode: "05601", city: "Montpelier", state: "Vermont", stateAbbr: "VT" },
  { zipCode: "05401", city: "Burlington", state: "Vermont", stateAbbr: "VT" },
  { zipCode: "05301", city: "Brattleboro", state: "Vermont", stateAbbr: "VT" },
  
  // Virginia
  { zipCode: "23219", city: "Richmond", state: "Virginia", stateAbbr: "VA" },
  { zipCode: "23510", city: "Norfolk", state: "Virginia", stateAbbr: "VA" },
  { zipCode: "22314", city: "Alexandria", state: "Virginia", stateAbbr: "VA" },
  { zipCode: "24016", city: "Roanoke", state: "Virginia", stateAbbr: "VA" },
  { zipCode: "23606", city: "Newport News", state: "Virginia", stateAbbr: "VA" },
  
  // Washington
  { zipCode: "98101", city: "Seattle", state: "Washington", stateAbbr: "WA" },
  { zipCode: "99201", city: "Spokane", state: "Washington", stateAbbr: "WA" },
  { zipCode: "98501", city: "Olympia", state: "Washington", stateAbbr: "WA" },
  { zipCode: "98225", city: "Bellingham", state: "Washington", stateAbbr: "WA" },
  { zipCode: "99301", city: "Pasco", state: "Washington", stateAbbr: "WA" },
  
  // West Virginia
  { zipCode: "25301", city: "Charleston", state: "West Virginia", stateAbbr: "WV" },
  { zipCode: "26501", city: "Morgantown", state: "West Virginia", stateAbbr: "WV" },
  { zipCode: "25401", city: "Martinsburg", state: "West Virginia", stateAbbr: "WV" },
  
  // Wisconsin
  { zipCode: "53201", city: "Milwaukee", state: "Wisconsin", stateAbbr: "WI" },
  { zipCode: "53701", city: "Madison", state: "Wisconsin", stateAbbr: "WI" },
  { zipCode: "54301", city: "Green Bay", state: "Wisconsin", stateAbbr: "WI" },
  { zipCode: "54601", city: "La Crosse", state: "Wisconsin", stateAbbr: "WI" },
  
  // Wyoming
  { zipCode: "82001", city: "Cheyenne", state: "Wyoming", stateAbbr: "WY" },
  { zipCode: "82601", city: "Casper", state: "Wyoming", stateAbbr: "WY" },
  { zipCode: "83001", city: "Jackson", state: "Wyoming", stateAbbr: "WY" },
  
  // Washington, D.C.
  { zipCode: "20001", city: "Washington", state: "District of Columbia", stateAbbr: "DC" },
  { zipCode: "20036", city: "Washington", state: "District of Columbia", stateAbbr: "DC" },
  { zipCode: "20515", city: "Washington", state: "District of Columbia", stateAbbr: "DC" },
];
