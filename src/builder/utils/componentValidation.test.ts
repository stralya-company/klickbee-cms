import { describe, expect, it } from "vitest";
import {
	DisplayType,
	TextAlign,
} from "../types/components/properties/componentStylePropsType";
import {
	getValidationErrorMessages,
	isValidationSuccess,
	validateComponentContentProps,
	validateComponentProps,
	validateComponentStyleProps,
} from "./componentValidation";

describe("Component Validation", () => {
	describe("validateComponentContentProps", () => {
		it("should validate valid content props for a Heading component", () => {
			const result = validateComponentContentProps("Heading", {
				level: 1,
				text: "Hello World",
			});

			expect(result.success).toBe(true);
			if (result.success) {
				expect(result.data).toEqual({
					level: 1,
					text: "Hello World",
				});
			}
		});

		it("should reject invalid content props for a Heading component", () => {
			const result = validateComponentContentProps("Heading", {
				level: 7, // Invalid level (should be 1-6)
				text: "Hello World",
			});

			expect(result.success).toBe(false);
		});

		it("should validate valid content props for a Button component", () => {
			const result = validateComponentContentProps("Button", {
				href: "https://example.com",
				icon: "arrow-right",
				text: "Click Me",
			});

			expect(result.success).toBe(true);
			if (result.success) {
				expect(result.data).toEqual({
					href: "https://example.com",
					icon: "arrow-right",
					text: "Click Me",
				});
			}
		});

		it("should reject invalid content props for a Button component", () => {
			const result = validateComponentContentProps("Button", {
				href: "invalid-url", // Invalid URL format
				icon: "arrow-right",
				text: "Click Me",
			});

			expect(result.success).toBe(false);
		});
	});

	describe("validateComponentStyleProps", () => {
		it("should validate valid style props for a Section component", () => {
			const result = validateComponentStyleProps("Section", {
				background: {
					color: {
						hexCode: "#f5f5f5",
						name: "Light Gray",
						type: "primary",
					},
				},
				layout: {
					display: "flex",
					flex: {
						alignItems: "center",
						direction: "column",
						justifyContent: "center",
					},
				},
				sizeAndSpacing: {
					padding: {
						bottom: { max: 2, min: 1, sizeUnit: "rem" },
						key: "test-padding",
						left: { max: 2, min: 1, sizeUnit: "rem" },
						right: { max: 2, min: 1, sizeUnit: "rem" },
						top: { max: 2, min: 1, sizeUnit: "rem" },
					},
				},
			});

			expect(result.success).toBe(true);
		});

		it("should reject invalid style props for a Section component", () => {
			const result = validateComponentStyleProps("Section", {
				layout: {
					display: "invalid-display" as unknown as DisplayType, // Invalid display value
				},
			});

			expect(result.success).toBe(false);
		});
	});

	describe("validateComponentProps", () => {
		it("should validate valid props for a Paragraph component", () => {
			const result = validateComponentProps("Paragraph", {
				contentProps: {
					text: "This is a paragraph of text.",
				},
				styleProps: {
					typography: {
						color: {
							hexCode: "#333333",
							name: "Dark Gray",
							type: "primary",
						},
						textAlign: "left",
					},
				},
			});

			expect(result.success).toBe(true);
		});

		it("should reject props with invalid content for a Paragraph component", () => {
			const result = validateComponentProps("Paragraph", {
				contentProps: {
					level: 2, // Paragraph doesn't have a level property
				},
				styleProps: {
					typography: {
						textAlign: "left",
					},
				},
			});

			expect(result.success).toBe(false);
		});

		it("should reject props with invalid style for a Paragraph component", () => {
			const result = validateComponentProps("Paragraph", {
				contentProps: {
					text: "This is a paragraph of text.",
				},
				styleProps: {
					typography: {
						textAlign: "invalid-align" as unknown as TextAlign, // Invalid text align value
					},
				},
			});

			expect(result.success).toBe(false);
		});
	});

	describe("isValidationSuccess", () => {
		it("should return true for successful validation results", () => {
			const result = validateComponentContentProps("Heading", {
				level: 1,
				text: "Hello World",
			});

			expect(isValidationSuccess(result)).toBe(true);
		});

		it("should return false for failed validation results", () => {
			const result = validateComponentContentProps("Heading", {
				level: 7, // Invalid level (should be 1-6)
				text: "Hello World",
			});

			expect(isValidationSuccess(result)).toBe(false);
		});
	});

	describe("getValidationErrorMessages", () => {
		it("should format error messages from validation errors", () => {
			const result = validateComponentContentProps("Heading", {
				level: 7, // Invalid level (should be 1-6)
				text: "Hello World",
			});

			if (!result.success) {
				const errorMessages = getValidationErrorMessages(result.error);
				expect(errorMessages.length).toBeGreaterThan(0);
				expect(errorMessages[0]).toContain("level");
			} else {
				// This should not happen
				expect(result.success).toBe(false);
			}
		});
	});
});
