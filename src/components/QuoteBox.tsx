import { useState, useEffect } from 'react';

const QuoteBox = () => {
    const [quotes, setQuotes] = useState<QuoteType[]>([]);
    const [currentQuote, setCurrentQuote] = useState<QuoteType| null>(null);

    // Загрузка JSON при старте
    useEffect(() => {
        fetch('/quotes.json') // если quotes.json в public
            .then(res => res.json())
            .then(data => {
                setQuotes(data);
                setCurrentQuote(getRandomQuote(data));
            });
    }, []);

    type QuoteType = {
        quote: string;
        author: string;
    };

    const getRandomQuote = (data:QuoteType[]) => {
        const index = Math.floor(Math.random() * data.length);
        return data[index];
    };

    const handleClick = () => {
        setCurrentQuote(getRandomQuote(quotes));
    };

    return (
        <div style={{ padding: '2rem', textAlign: 'center' }}>
            {currentQuote && (
                <>
                    <p style={{ fontSize: '1.5rem', fontStyle: 'italic' }}>
                        “{currentQuote.quote}”
                    </p>
                    <p style={{ marginTop: '1rem', fontWeight: 'bold' }}>
                        — {currentQuote.author}
                    </p>
                </>
            )}
            <button onClick={handleClick} style={{ marginTop: '2rem' }}>
                Показать другую цитату
            </button>
        </div>
    );
};

export default QuoteBox;
