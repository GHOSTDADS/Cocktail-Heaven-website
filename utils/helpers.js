module.exports = {
  
  get_emoji: function(category) {
    console.log("Category is:", category);

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

  format_date: (date) => {
    return date.toLocaleDateString();
  },

  format_amount: (amount) => {
    return parseInt(amount).toLocaleString();
  }

};
