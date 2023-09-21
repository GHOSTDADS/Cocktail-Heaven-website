module.exports = {
  //function to give emojis to diffenent cocktal catergories
  get_emoji: function(category) {
    const cocktail_emojis = {
      "Contemporary Classics": "🍸",
      "Unforgettables": "🍹",
      "Tropical": "🌴",
      "Dry": "🧉",
      "Sweet": "🍷"
    };

    const emoji = cocktail_emojis[category] || "📗"; // Default to book emoji if category is not found
    
    return `<span for="img" aria-label="${category}">${emoji}</span>`;
  },

  //fucntion to formate the date
  format_date: (date) => {
    return date.toLocaleDateString();
  },
};
