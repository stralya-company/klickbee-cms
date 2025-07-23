import { z } from "zod";

/**
 * Zod schemas for component content properties
 * These schemas are used for validation of component content props
 */

// List type schema
export const listTypeSchema = z.enum(["bulleted", "numbered"]);
export type ListType = z.infer<typeof listTypeSchema>;

// Field type schema
export const fieldTypeSchema = z.enum(["text", "email", "password"]);
export type FieldType = z.infer<typeof fieldTypeSchema>;

// Component content props schema
export const componentContentPropsSchema = z.object({
	// General text content (buttons, links, labels, etc.)
	text: z.string().optional(),

	// Formatted text (rich text blocks)
	content: z.string().optional(),

	// Heading level (H1–H6)
	level: z
		.union([
			z.literal(1),
			z.literal(2),
			z.literal(3),
			z.literal(4),
			z.literal(5),
			z.literal(6),
		])
		.optional(),

	// Link or action URL
	href: z.string().url("Invalid URL format").optional(),

	// Open link in new tab
	openInNewTab: z.boolean().optional(),

	// Icon reference
	icon: z.string().optional(),

	// Media source (image/video)
	src: z.string().optional(),

	// Alternative text for accessibility
	alt: z.string().optional(),

	// Autoplay for video
	autoplay: z.boolean().optional(),

	// Video controls
	controls: z.boolean().optional(),

	// Custom embed HTML or iframe
	code: z.string().optional(),

	// List type (bulleted or numbered)
	listType: listTypeSchema.optional(),

	// Array of text items
	items: z.array(z.string()).optional(),

	// Text after successful form submission
	successMessage: z.string().optional(),

	// Text after failed submission
	errorMessage: z.string().optional(),

	// Field identifier
	name: z.string().optional(),

	// Input placeholder
	placeholder: z.string().optional(),

	// Required field
	required: z.boolean().optional(),

	// Field type (text, email, password)
	type: fieldTypeSchema.optional(),

	// Default checked for checkbox
	defaultChecked: z.boolean().optional(),

	// Label for radio group
	question: z.string().optional(),

	// List of selectable options
	options: z.array(z.string()).optional(),

	// Placeholder option for dropdown
	defaultText: z.string().optional(),

	// Array of mime types (e.g., ["image/png", "image/jpeg"])
	mimeTypes: z.array(z.string()).optional(),

	// Numeric size limit (MB)
	maxFileSize: z
		.number()
		.nonnegative("File size must be a positive number")
		.optional(),

	// Label for the input
	label: z.string().optional(),
});

export type ComponentContentProps = z.infer<typeof componentContentPropsSchema>;
