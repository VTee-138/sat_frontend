import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Paper,
  Container,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { ArrowBack, BugReport, PlayArrow, Shuffle } from "@mui/icons-material";
import { useLanguage } from "../../contexts/LanguageContext";
import Loading from "../Loading";
import PracticeSectionTabs from "./components/PracticeSectionTabs";
import PracticePageSizeControls from "./components/PracticePageSizeControls";
import PracticeQuestionsTable from "./components/PracticeQuestionsTable";

export default function PracticeErrorMain() {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [tab, setTab] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Practice type dialog state
  const [practiceTypeDialog, setPracticeTypeDialog] = useState({
    open: false,
    selectedType: "",
  });

  // Lọc dữ liệu theo tab
  const filteredData = React.useMemo(() => {
    if (tab === 0) return data;

    if (tab === 1) {
      const englishData = data.filter(
        (q) => q?.questionData.section?.trim().toUpperCase() === "TIẾNG ANH"
      );
      return englishData;
    }

    if (tab === 2) {
      const mathData = data.filter(
        (q) => q?.questionData.section?.trim().toUpperCase() === "TOÁN"
      );
      return mathData;
    }

    return data;
  }, [data, tab]);

  // Phân trang
  const pagedData = React.useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredData.slice(start, start + pageSize);
  }, [filteredData, page, pageSize]);

  // Handle tab changes and reset page
  const handleTabChange = (newTab) => {
    setTab(newTab);
    setPage(1);
    setPageSize(10);
  };

  // Handle page size changes and reset page
  const handlePageSizeChange = (newPageSize) => {
    setPageSize(newPageSize);
    setPage(1);
  };

  const fetchErrorLogs = async () => {
    try {
      setLoading(true);
      // Simulate API delay
      setTimeout(() => {
        // Fake data for error logs
        const fakeData = [
          {
            _id: "1",
            questionData: {
              question: "If 3x + 5 = 14, what is the value of x?",
              section: "TOÁN",
              answers: {
                a: "2",
                b: "3",
                c: "4",
                d: "5",
              },
              correctAnswer: "b",
            },
            selectedAnswer: "a",
            isCorrect: false,
            note: "Forgot to subtract 5 from both sides first",
          },
          {
            _id: "2",
            questionData: {
              question:
                "Which of the following best describes the author's tone in the passage?",
              section: "TIẾNG ANH",
              answers: {
                a: "Optimistic",
                b: "Critical",
                c: "Neutral",
                d: "Enthusiastic",
              },
              correctAnswer: "b",
            },
            selectedAnswer: "a",
            isCorrect: false,
            note: "Need to pay more attention to negative words in the passage",
          },
          {
            _id: "3",
            questionData: {
              question: "The function f(x) = 2x² - 4x + 1. What is f(3)?",
              section: "TOÁN",
              answers: {
                a: "7",
                b: "11",
                c: "15",
                d: "19",
              },
              correctAnswer: "a",
            },
            selectedAnswer: "b",
            isCorrect: false,
            note: "Made calculation error: 2(9) - 4(3) + 1 = 18 - 12 + 1 = 7",
          },
          {
            _id: "4",
            questionData: {
              question:
                "Based on the graph, what is the relationship between variables x and y?",
              section: "TIẾNG ANH",
              answers: {
                a: "Directly proportional",
                b: "Inversely proportional",
                c: "No relationship",
                d: "Exponential growth",
              },
              correctAnswer: "a",
            },
            selectedAnswer: "c",
            isCorrect: false,
            note: "Need to practice reading graphs more carefully",
          },
          {
            _id: "5",
            questionData: {
              question: "Solve for y: 2y - 7 = 3y + 2",
              section: "TOÁN",
              answers: {
                a: "-9",
                b: "-5",
                c: "5",
                d: "9",
              },
              correctAnswer: "a",
            },
            selectedAnswer: "d",
            isCorrect: false,
            note: "Wrong sign when moving terms: 2y - 3y = 2 + 7, so -y = 9, therefore y = -9",
          },
          {
            _id: "6",
            questionData: {
              question:
                "The author uses the phrase 'a double-edged sword' to suggest that technology:",
              section: "TIẾNG ANH",
              answers: {
                a: "Is always beneficial",
                b: "Has both positive and negative effects",
                c: "Is dangerous",
                d: "Should be avoided",
              },
              correctAnswer: "b",
            },
            selectedAnswer: "c",
            isCorrect: false,
            note: "Double-edged sword means having both advantages and disadvantages",
          },
          {
            _id: "7",
            questionData: {
              question:
                "If the area of a square is 64 square units, what is its perimeter?",
              section: "TOÁN",
              answers: {
                a: "16",
                b: "24",
                c: "32",
                d: "64",
              },
              correctAnswer: "c",
            },
            selectedAnswer: "a",
            isCorrect: false,
            note: "Side length = √64 = 8, so perimeter = 4 × 8 = 32",
          },
          {
            _id: "8",
            questionData: {
              question:
                "Which transition word best connects these two sentences in the passage?",
              section: "TIẾNG ANH",
              answers: {
                a: "However",
                b: "Therefore",
                c: "Furthermore",
                d: "Meanwhile",
              },
              correctAnswer: "a",
            },
            selectedAnswer: "c",
            isCorrect: false,
            note: "The second sentence contrasts with the first, so 'However' is correct",
          },
        ];

        setData(fakeData);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error("Error fetching error logs:", error);
      setData([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchErrorLogs();
  }, []);

  const handleBackClick = () => {
    navigate("/practice");
  };

  // Practice type options
  const practiceTypes = [
    {
      value: "algebra",
      label: t("practice.practiceTypes.algebra") || "Đại số",
    },
    {
      value: "geometry",
      label: t("practice.practiceTypes.geometry") || "Hình học",
    },
    {
      value: "reading",
      label: t("practice.practiceTypes.reading") || "Đọc hiểu",
    },
    { value: "writing", label: t("practice.practiceTypes.writing") || "Viết" },
    {
      value: "vocabulary",
      label: t("practice.practiceTypes.vocabulary") || "Từ vựng",
    },
    {
      value: "grammar",
      label: t("practice.practiceTypes.grammar") || "Ngữ pháp",
    },
  ];

  const handlePracticeByType = () => {
    setPracticeTypeDialog({
      open: true,
      selectedType: "",
    });
  };

  const handlePracticeAll = () => {
    // Navigate to practice all mode
    console.log("Start practice all mode");
    // You can implement the navigation logic here
  };

  const handleClosePracticeTypeDialog = () => {
    setPracticeTypeDialog({
      open: false,
      selectedType: "",
    });
  };

  const handleStartTypePractice = () => {
    if (practiceTypeDialog.selectedType) {
      console.log("Start practice with type:", practiceTypeDialog.selectedType);
      // You can implement the navigation logic here
      handleClosePracticeTypeDialog();
    }
  };

  const handleTypeChange = (event) => {
    setPracticeTypeDialog({
      ...practiceTypeDialog,
      selectedType: event.target.value,
    });
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
      }}
    >
      <Container
        maxWidth="lg"
        sx={{ pt: 12, pb: 6, position: "relative", zIndex: 1 }}
      >
        {/* Back Button */}
        <Button
          startIcon={<ArrowBack />}
          onClick={handleBackClick}
          sx={{
            mb: 3,
            fontWeight: 600,
            color: "#546e7a",
            "&:hover": {
              backgroundColor: "rgba(0,0,0,0.04)",
            },
          }}
        >
          {t("practice.backToPractice")}
        </Button>

        {/* Page Header */}
        <Box sx={{ mb: 4 }}>
          <Paper
            elevation={0}
            sx={{
              p: { xs: 2, md: 3 },
              borderRadius: 3,
              background: "#fff",
              display: "flex",
              alignItems: "center",
              border: `1px solid #e0e0e0`,
              position: "relative",
              overflow: "hidden",
            }}
          >
            <BugReport sx={{ fontSize: 48, color: "#f44336", mr: 2.5 }} />
            <Box>
              <Typography
                variant="h5"
                sx={{ fontWeight: 700, color: "#1a237e" }}
              >
                {t("practice.errorAnalysis")}
              </Typography>
              <Typography variant="body2" sx={{ color: "#546e7a" }}>
                {data.length || 0} {t("errorLogs.question")}
              </Typography>
            </Box>
          </Paper>
        </Box>

        {/* Main Content Card */}
        <Paper
          elevation={0}
          sx={{
            borderRadius: 4,
            overflow: "hidden",
            background: "#fff",
            border: `1px solid #e0e0e0`,
            boxShadow: `0 8px 16px rgba(0,0,0,0.05)`,
          }}
        >
          {/* Tabs Section */}
          <PracticeSectionTabs tab={tab} onTabChange={handleTabChange} />

          {/* Content */}
          <Box sx={{ p: 4 }}>
            {/* Page Size Controls and Practice Buttons */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 3,
                flexWrap: "wrap",
                gap: 2,
              }}
            >
              <PracticePageSizeControls
                pageSize={pageSize}
                onPageSizeChange={handlePageSizeChange}
                totalItems={filteredData.length}
              />

              <Box sx={{ display: "flex", gap: 2 }}>
                <Button
                  variant="contained"
                  startIcon={<PlayArrow />}
                  onClick={handlePracticeByType}
                  sx={{
                    background:
                      "linear-gradient(135deg, #f44336 0%, #e91e63 100%)",
                    color: "white",
                    borderRadius: 2,
                    px: 3,
                    py: 1,
                    fontWeight: 600,
                    "&:hover": {
                      background:
                        "linear-gradient(135deg, #e91e63 0%, #f44336 100%)",
                    },
                  }}
                >
                  {t("practice.practiceByType") || "Luyện tập theo dạng bài"}
                </Button>

                <Button
                  variant="outlined"
                  startIcon={<Shuffle />}
                  onClick={handlePracticeAll}
                  sx={{
                    borderColor: "#f44336",
                    color: "#f44336",
                    borderRadius: 2,
                    px: 3,
                    py: 1,
                    fontWeight: 600,
                    "&:hover": {
                      borderColor: "#e91e63",
                      backgroundColor: "#ffebee",
                      color: "#e91e63",
                    },
                  }}
                >
                  {t("practice.practiceAll") || "Luyện tập tất cả"}
                </Button>
              </Box>
            </Box>

            {loading ? (
              <Loading />
            ) : (
              <PracticeQuestionsTable
                data={pagedData}
                page={page}
                pageSize={pageSize}
                onPageChange={setPage}
                totalItems={filteredData.length}
                // onRefresh={fetchErrorLogs}
              />
            )}
          </Box>
        </Paper>
      </Container>

      {/* Practice Type Selection Dialog */}
      <Dialog
        open={practiceTypeDialog.open}
        onClose={handleClosePracticeTypeDialog}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            p: 1,
          },
        }}
      >
        <DialogTitle
          sx={{
            background: "linear-gradient(135deg, #f44336 0%, #e91e63 100%)",
            color: "white",
            textAlign: "center",
            fontWeight: 700,
            fontSize: "1.3rem",
            m: -1,
            mb: 0,
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
            <PlayArrow />
            {t("practice.selectPracticeType") || "Chọn dạng bài luyện tập"}
          </Box>
        </DialogTitle>

        <DialogContent sx={{ pt: 3, pb: 2 }}>
          <Typography
            variant="body1"
            sx={{ mb: 3, color: "#666", textAlign: "center" }}
          >
            {t("practice.selectPracticeTypeDescription") ||
              "Chọn dạng bài bạn muốn luyện tập để tập trung vào những điểm yếu cần cải thiện."}
          </Typography>

          <FormControl fullWidth>
            <InputLabel id="practice-type-label">
              {t("practice.practiceType") || "Dạng bài"}
            </InputLabel>
            <Select
              labelId="practice-type-label"
              value={practiceTypeDialog.selectedType}
              label={t("practice.practiceType") || "Dạng bài"}
              onChange={handleTypeChange}
              sx={{
                borderRadius: 2,
              }}
            >
              {practiceTypes.map((type) => (
                <MenuItem key={type.value} value={type.value}>
                  {type.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>

        <DialogActions sx={{ p: 3, justifyContent: "center", gap: 2 }}>
          <Button
            onClick={handleClosePracticeTypeDialog}
            variant="outlined"
            sx={{
              borderColor: "#666",
              color: "#666",
              px: 3,
              py: 1,
              borderRadius: 2,
              "&:hover": {
                borderColor: "#999",
                backgroundColor: "#f5f5f5",
              },
            }}
          >
            {t("common.cancel") || "Hủy"}
          </Button>
          <Button
            onClick={handleStartTypePractice}
            variant="contained"
            disabled={!practiceTypeDialog.selectedType}
            sx={{
              background: "linear-gradient(135deg, #f44336 0%, #e91e63 100%)",
              px: 3,
              py: 1,
              borderRadius: 2,
              "&:hover": {
                background: "linear-gradient(135deg, #e91e63 0%, #f44336 100%)",
              },
              "&:disabled": {
                background: "#ccc",
                color: "#999",
              },
            }}
          >
            {t("practice.startPractice") || "Bắt đầu luyện tập"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
