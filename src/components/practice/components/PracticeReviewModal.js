import React, { useState, useMemo, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Typography,
  TextField,
  Button,
  Chip,
  Alert,
  CircularProgress,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import {
  CheckCircle,
  Cancel,
  Quiz,
  Edit,
  Save,
  Close,
} from "@mui/icons-material";
import { useLanguage } from "../../../contexts/LanguageContext";
import { toast } from "react-toastify";
import MathRenderer from "../../../common/MathRenderer";

export default function PracticeReviewModal({
  open,
  onClose,
  questionData,
  noteData,
  id,
  folderId,
  onRefresh,
}) {
  const { t, currentLanguage } = useLanguage();
  const [noteText, setNoteText] = useState("");
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [status, setStatus] = useState("needs_review");
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);

  const sectionName = useMemo(() => {
    if (!questionData) return "";
    if (questionData.section === "TIẾNG ANH") {
      return t("scoreDetails.readingWriting");
    }
    if (questionData.section === "TOÁN") {
      return t("scoreDetails.math");
    }
    return questionData.section;
  }, [questionData, currentLanguage, t]);

  const handleUpdateNote = async () => {
    setIsSaving(true);
    try {
      // Simulate API call delay
      setTimeout(() => {
        toast.success(t("errorLogs.noteUpdatedSuccess"));
        setIsEditing(false);
        setIsSaving(false);
        handleClose();
      }, 1000);
    } catch (err) {
      console.error("Failed to update note:", err);
      toast.error(t("errorLogs.noteUpdateError"));
      setIsSaving(false);
    }
  };

  const handleStatusChange = async (event) => {
    const newStatus = event.target.value;
    if (!id || isUpdatingStatus) return;

    const oldStatus = status;
    setStatus(newStatus);
    setIsUpdatingStatus(true);

    try {
      // Simulate API call delay
      setTimeout(() => {
        toast.success(t("errorLogs.statusUpdatedSuccess"));
        setIsUpdatingStatus(false);
        handleClose();
      }, 1000);
    } catch (err) {
      setStatus(oldStatus);
      console.error("Failed to update status:", err);
      toast.error(t("errorLogs.statusUpdateError"));
      setIsUpdatingStatus(false);
    }
  };

  const handleSave = () => {
    if (!noteText.trim()) {
      setError("Please enter your notes before saving");
      return;
    }
    setError("");
    handleUpdateNote();
  };

  const handleClose = () => {
    setNoteText("");
    setError("");
    setIsEditing(false);
    onClose();
  };

  useEffect(() => {
    if (open) {
      // Set note text from noteData (which is the note string from our fake data)
      setNoteText(noteData || "");
      setStatus("needs_review");
    }
  }, [open, noteData]);

  if (!questionData) return null;

  const getSectionColor = (section) => {
    if (section === "TIẾNG ANH") {
      return {
        bg: "#e3f2fd",
        color: "#1976d2",
        border: "#1976d2",
      };
    }
    return {
      bg: "#fff3e0",
      color: "#f57c00",
      border: "#f57c00",
    };
  };

  const sectionColors = getSectionColor(questionData.section);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="lg"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          minHeight: "80vh",
          background: "linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%)",
        },
      }}
    >
      <DialogTitle
        sx={{
          background: "linear-gradient(135deg, #f44336 0%, #e91e63 100%)",
          color: "white",
          textAlign: "center",
          fontWeight: 700,
          fontSize: "1.5rem",
          position: "relative",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 1,
          }}
        >
          <Quiz />
          {t("practice.reviewQuestion")}
        </Box>
        <Button
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: "white",
            minWidth: "auto",
            p: 1,
          }}
        >
          <Close />
        </Button>
      </DialogTitle>

      <DialogContent sx={{ p: 4 }}>
        {/* Section Header */}
        <Box sx={{ mb: 3 }}>
          <Chip
            label={sectionName}
            sx={{
              bgcolor: sectionColors.bg,
              color: sectionColors.color,
              fontWeight: 600,
              border: `1px solid ${sectionColors.border}`,
              borderRadius: 2,
              fontSize: "1rem",
              px: 2,
              py: 1,
            }}
          />
        </Box>

        {/* Question Content */}
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h6"
            gutterBottom
            sx={{ fontWeight: 600, color: "#1a237e" }}
          >
            {t("scoreDetails.question")}
          </Typography>
          <Box
            sx={{
              p: 3,
              border: "2px solid #e0e0e0",
              borderRadius: 3,
              bgcolor: "#fafafa",
              minHeight: 100,
            }}
          >
            <MathRenderer content={questionData.question} />
          </Box>
        </Box>

        {/* Answer Options */}
        {questionData.answers && (
          <Box sx={{ mb: 4 }}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ fontWeight: 600, color: "#1a237e" }}
            >
              {t("scoreDetails.answerOptions")}
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {Object.entries(questionData.answers).map(([key, value]) => (
                <Box
                  key={key}
                  sx={{
                    p: 2,
                    border: `2px solid ${
                      key === questionData.correctAnswer ? "#4caf50" : "#e0e0e0"
                    }`,
                    borderRadius: 2,
                    bgcolor:
                      key === questionData.correctAnswer
                        ? "#e8f5e8"
                        : "#fafafa",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight: 600,
                      mr: 2,
                      color:
                        key === questionData.correctAnswer ? "#2e7d32" : "#666",
                    }}
                  >
                    {key.toUpperCase()}.
                  </Typography>
                  <MathRenderer content={value} />
                  {key === questionData.correctAnswer && (
                    <CheckCircle sx={{ ml: "auto", color: "#4caf50" }} />
                  )}
                </Box>
              ))}
            </Box>
          </Box>
        )}

        {/* Status Section */}
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h6"
            gutterBottom
            sx={{ fontWeight: 600, color: "#1a237e" }}
          >
            {t("errorLogs.needsReview")}
          </Typography>
          <RadioGroup
            row
            value={status}
            onChange={handleStatusChange}
            disabled={isUpdatingStatus}
          >
            <FormControlLabel
              value="needs_review"
              control={<Radio sx={{ color: "#ff9800" }} />}
              label={
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Chip
                    label={t("errorLogs.needsReview")}
                    size="small"
                    sx={{ bgcolor: "#fff3e0", color: "#f57c00" }}
                  />
                  {isUpdatingStatus && status === "needs_review" && (
                    <CircularProgress size={16} />
                  )}
                </Box>
              }
            />
            <FormControlLabel
              value="reviewed"
              control={<Radio sx={{ color: "#4caf50" }} />}
              label={
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Chip
                    label={t("practice.reviewed")}
                    size="small"
                    sx={{ bgcolor: "#e8f5e8", color: "#4caf50" }}
                  />
                  {isUpdatingStatus && status === "reviewed" && (
                    <CircularProgress size={16} />
                  )}
                </Box>
              }
            />
          </RadioGroup>
        </Box>

        {/* Notes Section */}
        <Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, color: "#1a237e" }}>
              {t("practice.notes")}
            </Typography>
            <Button
              startIcon={<Edit />}
              variant="outlined"
              size="small"
              onClick={() => setIsEditing(!isEditing)}
              sx={{
                borderColor: "#f44336",
                color: "#f44336",
                "&:hover": {
                  borderColor: "#e91e63",
                  backgroundColor: "#ffebee",
                },
              }}
            >
              {isEditing ? t("common.cancel") : t("common.edit")}
            </Button>
          </Box>

          {isEditing ? (
            <Box>
              <TextField
                fullWidth
                multiline
                rows={4}
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                placeholder={t("practice.enterNotes")}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                  },
                }}
              />
              {error && (
                <Alert severity="error" sx={{ mt: 2 }}>
                  {error}
                </Alert>
              )}
              <Box sx={{ mt: 2, display: "flex", gap: 2 }}>
                <Button
                  variant="contained"
                  startIcon={<Save />}
                  onClick={handleSave}
                  disabled={isSaving}
                  sx={{
                    background:
                      "linear-gradient(135deg, #f44336 0%, #e91e63 100%)",
                    "&:hover": {
                      background:
                        "linear-gradient(135deg, #e91e63 0%, #f44336 100%)",
                    },
                  }}
                >
                  {isSaving ? (
                    <CircularProgress size={20} color="inherit" />
                  ) : (
                    t("common.save")
                  )}
                </Button>
                <Button variant="outlined" onClick={() => setIsEditing(false)}>
                  {t("common.cancel")}
                </Button>
              </Box>
            </Box>
          ) : (
            <Box
              sx={{
                p: 3,
                border: "1px solid #e0e0e0",
                borderRadius: 2,
                bgcolor: "#fafafa",
                minHeight: 100,
              }}
            >
              <Typography variant="body1" sx={{ whiteSpace: "pre-wrap" }}>
                {noteText || t("practice.noNotesYet")}
              </Typography>
            </Box>
          )}
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 3, justifyContent: "center" }}>
        <Button
          variant="outlined"
          onClick={handleClose}
          sx={{
            borderColor: "#666",
            color: "#666",
            px: 4,
            "&:hover": { borderColor: "#999", backgroundColor: "#f5f5f5" },
          }}
        >
          {t("common.close")}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
