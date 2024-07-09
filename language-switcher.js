document.addEventListener('DOMContentLoaded', function() {
    const switcher = document.getElementById('language-switcher');

    switcher.addEventListener('change', function() {
        const selectedLanguage = switcher.value;
        switch (selectedLanguage) {
            case 'en':
                window.location.href = 'index.html';
                break;
            case 'es':
                window.location.href = 'index-es.html';
                break;
            case 'zh':
                window.location.href = 'index-zh.html';
                break;
            default:
                window.location.href = 'index.html';
        }
    });
});
