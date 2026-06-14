import { Alert, Box, Paper, Tab, Tabs, TextField, Typography, CircularProgress } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext/auth-context";
import type { LoginCredentials } from "../../../components/shared/types/AuthTypes";

interface CardData {
    id: string;
    value: string;
    isFlipped: boolean;
}

const generateDeck = (values: string[]): CardData[] => {
    const cards = [...values, ...values].map((value, index) => ({
        id: `${value}-${index}`, // Unique ID for React mapping
        value,
        isFlipped: false
    }));

    for (let i = cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[j]] = [cards[j], cards[i]];
    }
    return cards;
};

// Define our two pools of characters
const LETTERS = 'abcdefghijklmnopqrstuvwxyz'.split('');
const SPECIALS_AND_ACTIONS = [
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
    '!', '@', '#', '$', '%', '^', '&', '*',
    'Shift', 'Backspace', 'Send'
];

function SlowLogin() {
    const [email, setEmail] = useState("test@example.com");
    const [password, setPassword] = useState("");
    const [err, setErr] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [hasFailedFinalAttempt, setHasFailedFinalAttempt] = useState(false);

    const [activeTab, setActiveTab] = useState(0);
    const [isShifted, setIsShifted] = useState(false);

    const [letterDeck, setLetterDeck] = useState<CardData[]>([]);
    const [specialDeck, setSpecialDeck] = useState<CardData[]>([]);

    const [flippedLetters, setFlippedLetters] = useState<number[]>([]);
    const [flippedSpecials, setFlippedSpecials] = useState<number[]>([]);

    const navigate = useNavigate();
    const { login } = useAuth();

    useEffect(() => {
        setLetterDeck(generateDeck(LETTERS));
        setSpecialDeck(generateDeck(SPECIALS_AND_ACTIONS));
    }, []);

    const processMatch = (value: string) => {
        if (value === 'Backspace') {
            setPassword(prev => prev.slice(0, -1));
        } else if (value === 'Shift') {
            setIsShifted(prev => !prev);
        } else if (value === 'Send') {
            executeLogin();
        } else {
            const finalChar = isShifted && LETTERS.includes(value) ? value.toUpperCase() : value;
            setPassword(prev => prev + finalChar);
        }
    };

    useEffect(() => {
        if (flippedLetters.length === 2) {
            const timer = setTimeout(() => {
                const [idx1, idx2] = flippedLetters;
                if (letterDeck[idx1].value === letterDeck[idx2].value) {
                    processMatch(letterDeck[idx1].value);
                }
                // Unflip
                setLetterDeck(prev => prev.map((c, i) =>
                    i === idx1 || i === idx2 ? { ...c, isFlipped: false } : c
                ));
                setFlippedLetters([]);
            }, 600);
            return () => clearTimeout(timer);
        }
    }, [flippedLetters, letterDeck]);

    useEffect(() => {
        if (flippedSpecials.length === 2) {
            const timer = setTimeout(() => {
                const [idx1, idx2] = flippedSpecials;
                if (specialDeck[idx1].value === specialDeck[idx2].value) {
                    processMatch(specialDeck[idx1].value);
                }
                // Unflip
                setSpecialDeck(prev => prev.map((c, i) =>
                    i === idx1 || i === idx2 ? { ...c, isFlipped: false } : c
                ));
                setFlippedSpecials([]);
            }, 600);
            return () => clearTimeout(timer);
        }
    }, [flippedSpecials, specialDeck]);

    const handleCardClick = (index: number, deckType: 'letters' | 'specials') => {
        if (hasFailedFinalAttempt || isLoading) return;

        if (deckType === 'letters') {
            if (flippedLetters.length >= 2 || letterDeck[index].isFlipped) return;
            setLetterDeck(prev => prev.map((c, i) => i === index ? { ...c, isFlipped: true } : c));
            setFlippedLetters(prev => [...prev, index]);
        } else {
            if (flippedSpecials.length >= 2 || specialDeck[index].isFlipped) return;
            setSpecialDeck(prev => prev.map((c, i) => i === index ? { ...c, isFlipped: true } : c));
            setFlippedSpecials(prev => [...prev, index]);
        }
    };

    const executeLogin = async () => {
        setErr("");
        setIsLoading(true);

        try {
            const credentials: LoginCredentials = { email, password };
            await login(credentials);
            
            localStorage.removeItem("penaltyUntil");
            navigate("/");
        } catch (error) {
            const errorMessage = (error as Error).message;
            if (errorMessage.includes("Account is locked") || errorMessage.includes("|4")) {
                setHasFailedFinalAttempt(true);
                setErr("Final attempt failed. Account locked. Please reflect on your actions.");
            } else {
                setErr(errorMessage.split("|")[0] || errorMessage);
            }
        } finally {
            setIsLoading(false);
        }
    };

    const renderBoard = (deck: CardData[], type: 'letters' | 'specials') => (
        <Box sx={{
            display: 'grid',
            gridTemplateColumns: type === 'letters' ? 'repeat(13, 1fr)' : 'repeat(7, 1fr)',
            gap: '8px',
            mt: 3
        }}>
            {deck.map((card, index) => {
                const isActionCard = ['Shift', 'Backspace', 'Send'].includes(card.value);
                const displayValue = isShifted && type === 'letters' ? card.value.toUpperCase() : card.value;

                return (
                    <Paper
                        key={card.id}
                        elevation={card.isFlipped ? 4 : 1}
                        onClick={() => handleCardClick(index, type)}
                        sx={{
                            height: isActionCard ? 50 : 45,
                            gridColumn: isActionCard ? 'span 2' : 'span 1',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: hasFailedFinalAttempt || isLoading ? 'not-allowed' : 'pointer',
                            backgroundColor: card.isFlipped ? '#d32f2f' : '#2c2c2c',
                            color: card.isFlipped ? '#ffffff' : 'transparent',
                            border: card.isFlipped ? '2px solid #ff5252' : '2px solid #444',
                            borderRadius: '6px',
                            fontWeight: 'bold',
                            fontSize: isActionCard ? '0.75rem' : '1.3rem',
                            userSelect: 'none',
                            transition: 'all 0.2s ease-in-out',
                            boxShadow: card.isFlipped ? '0 0 10px rgba(211, 47, 47, 0.5)' : 'none',
                            '&:hover': {
                                transform: card.isFlipped ? 'none' : 'scale(1.05)',
                                borderColor: card.isFlipped ? '#ff5252' : '#666'
                            }
                        }}
                    >
                        {displayValue}
                    </Paper>
                );
            })}
        </Box>
    );

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5, pb: 10 }}>
            <Paper
                elevation={10}
                sx={{
                    p: 4,
                    width: '100%',
                    maxWidth: 750,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 3,
                    backgroundColor: '#121212',
                    color: '#e0e0e0',
                    border: '1px solid #d32f2f',
                    borderRadius: 2
                }}
            >
                <Typography variant="h4" align="center" sx={{ color: '#ff5252', fontWeight: '900', letterSpacing: 2 }}>
                    Last attempt
                </Typography>

                <Typography variant="subtitle1" align="center" sx={{ color: '#aaa', mt: -2 }}>
                    Maximum standard attempts exceeded.
                </Typography>

                {err && <Alert severity="error" variant="filled" sx={{ fontWeight: 'bold' }}>{err}</Alert>}
                {isShifted && !hasFailedFinalAttempt && <Alert severity="warning" variant="outlined" sx={{ py: 0 }}>CAPS LOCK IS ACTIVE</Alert>}

                <TextField
                    label="Target E-mail"
                    variant="filled"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={hasFailedFinalAttempt || isLoading}
                    fullWidth
                    sx={{ input: { color: '#fff', backgroundColor: '#1e1e1e' } }}
                />

                <Box sx={{
                    mt: 1,
                    p: 3,
                    border: '1px solid #333',
                    borderRadius: 2,
                    backgroundColor: '#0a0a0a',
                    opacity: hasFailedFinalAttempt ? 0.4 : 1,
                    pointerEvents: hasFailedFinalAttempt ? 'none' : 'auto'
                }}>

                    {/* High-Contrast Password Display */}
                    <TextField
                        variant="outlined"
                        value={password}
                        placeholder="Password..."
                        slotProps={{ htmlInput: { readOnly: true } }}
                        fullWidth
                        sx={{
                            mb: 3,
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': { borderColor: '#d32f2f' },
                                '&:hover fieldset': { borderColor: '#ff5252' },
                            },
                            input: {
                                letterSpacing: 8,
                                textAlign: 'center',
                                fontSize: '2rem',
                                fontWeight: 'bold',
                                color: '#00ff00', // Terminal green text
                                backgroundColor: '#000', // Pitch black background
                                borderRadius: '4px',
                                padding: '15px'
                            }
                        }}
                    />

                    {isLoading && <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}><CircularProgress color="error" /></Box>}

                    <Tabs
                        value={activeTab}
                        onChange={(_, newValue) => setActiveTab(newValue)}
                        centered
                        textColor="inherit"
                        
                    >
                        <Tab label="Alphabet" sx={{ fontWeight: 'bold', color: activeTab === 0 ? '#ff5252' : '#888' }} />
                        <Tab label="Symbols & Actions" sx={{ fontWeight: 'bold', color: activeTab === 1 ? '#ff5252' : '#888' }} />
                    </Tabs>

                    {activeTab === 0 && renderBoard(letterDeck, 'letters')}
                    {activeTab === 1 && renderBoard(specialDeck, 'specials')}

                </Box>
            </Paper>
        </Box>
    );
}

export default SlowLogin;