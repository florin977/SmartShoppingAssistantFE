import { Alert, Box, Button, CircularProgress, Dialog, DialogContent, DialogTitle, Divider, LinearProgress, Stack, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import type { Analysis, Suggestion } from "../../shared/types/Analysis"
import { useCart } from "../../../contexts/CartContext/cart-context"
import { CartApiClient } from "../../../api/clients/CartApiClient"
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome"
import CheckIcon from "@mui/icons-material/Check"
import CloseIcon from "@mui/icons-material/Close"

interface AnalyzeDialogProps {
    onClose: () => void
}

type Decision = "approved" | "declined"

function AnalyzeDialog({ onClose }: AnalyzeDialogProps) {
    const [loading, setLoading] = useState(true)
    const [err, setErr] = useState("")
    const [analysis, setAnalysis] = useState<Analysis | null>(null)
    const [decisions, setDecisions] = useState<Record<number, Decision>>({})
    const loadingMessages = [
        '🤖 Reading your cart...',
        '🔍 Checking promotions...',
        '✨ Finding the best deals...',
        '🛒 Composing suggestions...',
    ]
    const [messageIndex, setMessageIndex] = useState(0)
    const [progress, setProgress] = useState(0)
    const [isOpen, setIsOpen] = useState(true)
    const [decisionCount, setDecisionCount] = useState(0)

    const { addItem } = useCart()

    async function handleApprove(suggestion: Suggestion) {
        await addItem(suggestion.productId, suggestion.quantity)
        setDecisions((current) => ({ ...current, [suggestion.productId]: "approved" }))
        setDecisionCount((current) => current + 1)
    }

    function handleDecline(suggestion: Suggestion) {
        setDecisions((current) => ({ ...current, [suggestion.productId]: "declined" }))
        setDecisionCount((current) => current + 1)
    }

    useEffect(() => {
        if (decisionCount === 5) {
            onClose()
        }
    }, [decisionCount])

    useEffect(() => {
        CartApiClient.analyze()
            .then((data) => {
                setAnalysis(data)
                setErr("")
            })
            .catch((e) => setErr((e as Error).message))
            .finally(() => setLoading(false))
    }, [])

    useEffect(() => {
        if (!loading) {
            return
        }

        const timer = setInterval(() => {
            setProgress((current) => (current >= 90 ? 90 : current + 5))
            setMessageIndex((current) => ((current + 1) % loadingMessages.length))
        }, 700)

        return () => clearInterval(timer)
    }, [loading])

    return (
        <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle color="textSecondary" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <AutoAwesomeIcon />
                AI Cart Analysis
            </DialogTitle>
            <DialogContent>
                {loading && (
                    <Box sx={{ py: 4, textAlign: "center", }}>
                        <Typography sx={{ mb: 2 }}>{loadingMessages[messageIndex]}</Typography>
                        <LinearProgress variant="determinate" value={progress} />
                    </Box>
                )}
                {err !== "" && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {err}
                    </Alert>
                )}
                {analysis !== null && !loading && (
                    <>
                        <Stack spacing={2}>
                            <Typography variant="body1">{analysis.summary}</Typography>
                            <Divider />

                            {analysis.suggestions.length === 0 && (
                                <Typography color="textSecondary" variant="body1">
                                    No suggestions for this cart
                                </Typography>
                            )}

                            {
                                analysis.suggestions.map((suggestion) => {
                                    const decision = decisions[suggestion.productId]

                                    return (
                                        <Box key={suggestion.productId} sx={{
                                            border: "1px solid",
                                            borderColor: "divider",
                                            borderRadius: 1,
                                            p: 2
                                        }}>
                                            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                                <Typography variant="subtitle1" color="textSecondary">
                                                    {suggestion.name} x {suggestion.quantity}
                                                </Typography>
                                                <Typography variant="subtitle1" color="textSecondary">
                                                    {suggestion.price} Ron
                                                </Typography>
                                            </Box>
                                            <Typography variant="body2" sx={{ mt: 0.5 }}>
                                                {suggestion.reason}
                                            </Typography>
                                            {suggestion.savings !== null && suggestion.savings !== 0 && (
                                                <Typography
                                                    variant="body2"
                                                    color="success"
                                                    sx={{ mt: 0.5 }}>
                                                    Saves {suggestion.savings.toFixed(2)} Ron
                                                </Typography>
                                            )}

                                            <Box sx={{ mt: 1.5 }}>
                                                {decision === undefined ? (
                                                    <Stack direction="row" spacing={1}>
                                                        <Button variant="contained" size="small" startIcon={<CheckIcon />} onClick={() => handleApprove(suggestion)}>Approve</Button>
                                                        <Button variant="outlined" size="small" startIcon={<CloseIcon />} onClick={() => handleDecline(suggestion)}>Decline</Button>
                                                    </Stack>
                                                ) : (<></>)}
                                            </Box>
                                        </Box>
                                    )
                                })
                            }
                            <Button variant="contained" onClick={onClose}>Close</Button>
                        </Stack>
                    </>
                )}
            </DialogContent>
        </Dialog>
    )
}

export default AnalyzeDialog