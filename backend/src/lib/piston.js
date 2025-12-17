import axios from "axios";

const PISTON_API = "https://emkc.org/api/v2/piston";

const LANGUAGE_VERSION = {
  javascript: { language: "javascript", version: "18.15.0" },
  python: { language: "python", version: "3.10.0" },
  java: { language: "java", version: "15.0.2" },
};


export async function executeCode(language, code) {
  try {
    const languageConfig =
      LANGUAGE_VERSION[language.toLowerCase()];

    if (!languageConfig) {
      return { success: false, error: `Unsupported language: ${language}` };
    }

    const response = await axios.post(
      `${PISTON_API}/execute`,
      {
        language: languageConfig.language,
        version: languageConfig.version,
        files: [
          {
            name: `main.${getFileExtension(language)}`,
            content: code,
          },
        ],
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    const run = response.data.run;

    const stdout = run.output || "";
    const stderr = run.stderr || "";

    if (stderr.trim().length > 0) {
      return { success: false, output: stdout, error: stderr };
    }

    return {
      success: true,
      output: stdout || "No output",
    };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Unknown error occurred while executing code",
    };
  }
}

function getFileExtension(language) {
  const map = {
    javascript: "js",
    python: "py",
    java: "java",
  };
  return map[language.toLowerCase()] || "txt";
}
