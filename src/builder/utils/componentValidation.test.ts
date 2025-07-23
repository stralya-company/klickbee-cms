import { describe, it, expect } from "vitest";
import {
	validateComponentContentProps,
	validateComponentStyleProps,
	validateComponentProps,
	isValidationSuccess,
	getValidationErrorMessages,
} from "./componentValidation";
import {
	DisplayType,
	TextAlign,
} from "@/builder/types/components/properties/componentStylePropsSchema";

describe("Component Validation", () => {
	describe("validateComponentContentProps", () => {
		it("should validate valid content props for a Heading component", () => {
			const result = validateComponentContentProps("Heading", {
				text: "Hello World",
				level: 1,
			});

			expect(result.success).toBe(true);
			if (result.success) {
				expect(result.data).toEqual({
					text: "Hello World",
					level: 1,
				});
			}
		});

		it("should reject invalid content props for a Heading component", () => {
			// @ts-expect-error - Testing invalid props
			const result = validateComponentContentProps("Heading", {
				text: "Hello World",
				level: 7, // Invalid level (should be 1-6)
			});

			expect(result.success).toBe(false);
		});

		it("should validate valid content props for a Button component", () => {
			const result = validateComponentContentProps("Button", {
				text: "Click Me",
				href: "https://example.com",
				icon: "arrow-right",
			});

			expect(result.success).toBe(true);
			if (result.success) {
				expect(result.data).toEqual({
					text: "Click Me",
					href: "https://example.com",
					icon: "arrow-right",
				});
			}
		});

		it("should reject invalid content props for a Button component", () => {
			const result = validateComponentContentProps("Button", {
				text: "Click Me",
				href: "invalid-url", // Invalid URL format
				icon: "arrow-right",
			});

			expect(result.success).toBe(false);
		});
	});

	describe("validateComponentStyleProps", () => {
		it("should validate valid style props for a Section component", () => {
			const result = validateComponentStyleProps("Section", {
				layout: {
					display: "flex",
					flex: {
						direction: "column",
						justifyContent: "center",
						alignItems: "center",
					},
				},
				sizeAndSpacing: {
					padding: {
						top: { min: 1, max: 2, sizeUnit: "rem" },
						right: { min: 1, max: 2, sizeUnit: "rem" },
						bottom: { min: 1, max: 2, sizeUnit: "rem" },
						left: { min: 1, max: 2, sizeUnit: "rem" },
						key: "test-padding",
					},
				},
				background: {
					color: {
						hexCode: "#f5f5f5",
						name: "Light Gray",
						type: "primary",
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
						textAlign: "left",
						color: {
							hexCode: "#333333",
							name: "Dark Gray",
							type: "primary",
						},
					},
				},
			});

			expect(result.success).toBe(true);
		});

		it("should reject props with invalid content for a Paragraph component", () => {
			const result = validateComponentProps("Paragraph", {
				contentProps: {
					// @ts-expect-error - Testing invalid props
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
				text: "Hello World",
				level: 1,
			});

			expect(isValidationSuccess(result)).toBe(true);
		});

		it("should return false for failed validation results", () => {
			// @ts-expect-error - Testing invalid props
			const result = validateComponentContentProps("Heading", {
				text: "Hello World",
				level: 7, // Invalid level (should be 1-6)
			});

			expect(isValidationSuccess(result)).toBe(false);
		});
	});

	describe("getValidationErrorMessages", () => {
		it("should format error messages from validation errors", () => {
			// @ts-expect-error - Testing invalid props
			const result = validateComponentContentProps("Heading", {
				text: "Hello World",
				level: 7, // Invalid level (should be 1-6)
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
