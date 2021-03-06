const oapStates = [
  {'value': '', 'text': 'State'},
  {'value': 'AL', 'text': 'Alabama'},
  {'value': 'AK', 'text': 'Alaska'},
  {'value': 'AZ', 'text': 'Arizona'},
  {'value': 'AR', 'text': 'Arkansas'},
  {'value': 'CA', 'text': 'California'},
  {'value': 'CO', 'text': 'Colorado'},
  {'value': 'CT', 'text': 'Connecticut'},
  {'value': 'DE', 'text': 'Delaware'},
  {'value': 'DC', 'text': 'D.C.'},
  {'value': 'FL', 'text': 'Florida'},
  {'value': 'GA', 'text': 'Georgia'},
  {'value': 'HI', 'text': 'Hawaii'},
  {'value': 'ID', 'text': 'Idaho'},
  {'value': 'IL', 'text': 'Illinois'},
  {'value': 'IN', 'text': 'Indiana'},
  {'value': 'IA', 'text': 'Iowa'},
  {'value': 'KS', 'text': 'Kansas'},
  {'value': 'KY', 'text': 'Kentucky'},
  {'value': 'LA', 'text': 'Louisiana'},
  {'value': 'ME', 'text': 'Maine'},
  {'value': 'MD', 'text': 'Maryland'},
  {'value': 'MA', 'text': 'Massachusetts'},
  {'value': 'MI', 'text': 'Michigan'},
  {'value': 'MN', 'text': 'Minnesota'},
  {'value': 'MS', 'text': 'Mississippi'},
  {'value': 'MO', 'text': 'Missouri'},
  {'value': 'MT', 'text': 'Montana'},
  {'value': 'NE', 'text': 'Nebraska'},
  {'value': 'NV', 'text': 'Nevada'},
  {'value': 'NH', 'text': 'New Hampshire'},
  {'value': 'NM', 'text': 'New Mexico'},
  {'value': 'NJ', 'text': 'New Jersey'},
  {'value': 'NY', 'text': 'New York'},
  {'value': 'NC', 'text': 'North Carolina'},
  {'value': 'ND', 'text': 'North Dakota'},
  {'value': 'OH', 'text': 'Ohio'},
  {'value': 'OK', 'text': 'Oklahoma'},
  {'value': 'OR', 'text': 'Oregon'},
  {'value': 'PA', 'text': 'Pennsylvania'},
  {'value': 'RI', 'text': 'Rhode Island'},
  {'value': 'SC', 'text': 'South Carolina'},
  {'value': 'SD', 'text': 'South Dakota'},
  {'value': 'TN', 'text': 'Tennessee'},
  {'value': 'TX', 'text': 'Texas'},
  {'value': 'UT', 'text': 'Utah'},
  {'value': 'VT', 'text': 'Vermont'},
  {'value': 'VA', 'text': 'Virginia'},
  {'value': 'WA', 'text': 'Washington'},
  {'value': 'WV', 'text': 'West Virginia'},
  {'value': 'WI', 'text': 'Wisconsin'},
  {'value': 'WY', 'text': 'Wyoming'},
  {'value': 'AB', 'text': 'Alberta'},
  {'value': 'BC', 'text': 'British Columbia'},
  {'value': 'MB', 'text': 'Manitoba'},
  {'value': 'NB', 'text': 'New Brunswick'},
  {'value': 'NL', 'text': 'Newfoundland and Labrador'},
  {'value': 'NS', 'text': 'Nova Scotia'},
  {'value': 'NT', 'text': 'Northwest Territories'},
  {'value': 'NU', 'text': 'Nunavut'},
  {'value': 'ON', 'text': 'Ontario'},
  {'value': 'PE', 'text': 'Prince Edward Island'},
  {'value': 'QC', 'text': 'Quebec'},
  {'value': 'SK', 'text': 'Saskatchewan'},
  {'value': 'YT', 'text': 'Yukon'},
  {'value': 'ACT', 'text': '(AU) Australian Capital Territory'},
  {'value': 'NSW', 'text': '(AU) New South Wales'},
  {'value': 'VIC', 'text': '(AU) Victoria'},
  {'value': 'QLD', 'text': '(AU) Queensland'},
  {'value': 'AU_NT', 'text': '(AU) Northern Territory'},
  {'value': 'AU_WA', 'text': '(AU) Western Australia'},
  {'value': 'SA', 'text': '(AU) South Australia'},
  {'value': 'TAS', 'text': '(AU) Tasmania'},
  {'value': 'GP', 'text': '(AF) Gauteng'},
  {'value': 'WP', 'text': '(AF) Western Cape'},
  {'value': 'EC', 'text': '(AF) Eastern Cape'},
  {'value': 'KZN', 'text': '(AF) Kwa-Zulu Natal'},
  {'value': 'NW', 'text': '(AF) North West'},
  {'value': 'AF_NC', 'text': '(AF) Northern Cape'},
  {'value': 'MP', 'text': '(AF) Mpumulanga'},
  {'value': 'FS', 'text': '(AF) Free State'},
  {'value': 'INASM', 'text': '(IN) Assam'},
  {'value': 'INANP', 'text': '(IN) Andaman and Nicobar Islands'},
  {'value': 'INARP', 'text': '(IN) Andhra Pradesh'},
  {'value': 'INAUP', 'text': '(IN) Arunachal Pradesh'},
  {'value': 'INBIH', 'text': '(IN) Bihar'},
  {'value': 'INCHA', 'text': '(IN) Chandigarh'},
  {'value': 'INCHH', 'text': '(IN) Chhattisgarh'},
  {'value': 'INDEL', 'text': '(IN) Delhi'},
  {'value': 'INDAM', 'text': '(IN) Daman and Diu'},
  {'value': 'INDAD', 'text': '(IN) Dadra and Nagar Haveli'},
  {'value': 'INGOA', 'text': '(IN) Goa'},
  {'value': 'INGUJ', 'text': '(IN) Gujarat'},
  {'value': 'INHAR', 'text': '(IN) Haryana'},
  {'value': 'INHIM', 'text': '(IN) Himachal Pradesh'},
  {'value': 'INJAM', 'text': '(IN) Jammu and Kashmir'},
  {'value': 'INJHA', 'text': '(IN) Jharkhand'},
  {'value': 'INKAR', 'text': '(IN) Karnataka'},
  {'value': 'INKER', 'text': '(IN) Kerala'},
  {'value': 'INLAK', 'text': '(IN) Lakshadweep'},
  {'value': 'INMIZ', 'text': '(IN) Mizoram'},
  {'value': 'INMAD', 'text': '(IN) Madhya Pradesh'},
  {'value': 'INMEG', 'text': '(IN) Meghalaya'},
  {'value': 'INMAN', 'text': '(IN) Manipur'},
  {'value': 'INMAH', 'text': '(IN) Maharashtra'},
  {'value': 'INNAG', 'text': '(IN) Nagaland'},
  {'value': 'INODI', 'text': '(IN) Odisha'},
  {'value': 'INPUD', 'text': '(IN) Puducherry'},
  {'value': 'INPUN', 'text': '(IN) Punjab'},
  {'value': 'INRAJ', 'text': '(IN) Rajasthan'},
  {'value': 'INSIK', 'text': '(IN) Sikkim'},
  {'value': 'INTRI', 'text': '(IN) Tripura'},
  {'value': 'INTAM', 'text': '(IN) Tamil Nadu'},
  {'value': 'INUTK', 'text': '(IN) Uttarakhand'},
  {'value': 'INUTP', 'text': '(IN) Uttar Pradesh'},
  {'value': 'INWBG', 'text': '(IN) West Bengal'},
  {'value': '_NOTLISTED_', 'text': 'My State is not listed'}
];
export default oapStates;
