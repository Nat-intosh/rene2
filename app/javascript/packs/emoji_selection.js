document.addEventListener('DOMContentLoaded', () => {
    const emojiFields = ['emoji1_id', 'emoji2_id', 'emoji3_id'];
    let selectedEmojis = [];
  
    document.querySelectorAll('.emoji-select').forEach(emoji => {
      emoji.addEventListener('click', () => {
        if (selectedEmojis.length < 3) {
          selectedEmojis.push(emoji.dataset.emoji_id);
          document.getElementById(emojiFields[selectedEmojis.length - 1]).value = emoji.dataset.emoji_id;
        }
      });
    });
    console.log("coucou");
  });