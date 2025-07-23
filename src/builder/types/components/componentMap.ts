import { ComponentContentProps } from "@/builder/types/components/properties/componentContentPropsType";
import { ComponentStyleProps } from "@/builder/types/components/properties/componentStylePropsType";

/**
 * Component categories for organizing components by their purpose
 */
/* eslint-disable no-unused-vars */
export enum ComponentCategory {
	LAYOUT = "Layout",
	TYPOGRAPHY = "Typography",
	MEDIA = "Media",
	INTERACTIVE = "Interactive",
	FORM = "Form",
	FORM_ELEMENTS = "Form Elements",
}

/**
 * Union type of all available component names for type safety
 */
export type ComponentName =
	// Layout components
	| "Section"
	| "Container"
	| "Grid"
	| "Spacer"
	| "Divider"
	// Typography components
	| "Heading"
	| "Paragraph"
	| "RichText"
	| "List"
	| "Link"
	// Interactive components
	| "Button"
	// Media components
	| "Image"
	| "Video"
	| "Embed"
	// Form components
	| "FormBlock"
	| "TextField"
	| "TextArea"
	| "Checkbox"
	| "RadioGroup"
	| "Dropdown"
	| "FileUpload"
	| "SubmitButton";

/**
 * Base interface for all component entries in the component map
 */
export interface ComponentMapEntry {
	/** Category this component belongs to */
	category: ComponentCategory;
	/** Content properties specific to this component */
	contentProps: Partial<ComponentContentProps>;
	/** Style properties applicable to this component */
	styleProps: Partial<ComponentStyleProps>;
	/** Optional description of the component's purpose */
	description?: string;
}

/**
 * Helper function to create a layout component entry with common style properties
 */
const createLayoutComponent = (
	description: string,
	additionalContentProps: Partial<ComponentContentProps> = {},
	additionalStyleProps: Partial<ComponentStyleProps> = {},
): ComponentMapEntry => ({
	category: ComponentCategory.LAYOUT,
	description,
	contentProps: {
		...additionalContentProps,
	},
	styleProps: {
		layout: {},
		sizeAndSpacing: {},
		background: {},
		bordersAndCorners: {},
		effects: {},
		...additionalStyleProps,
	},
});

/**
 * Helper function to create a typography component entry with common style properties
 */
const createTypographyComponent = (
	description: string,
	contentProps: Partial<ComponentContentProps>,
	additionalStyleProps: Partial<ComponentStyleProps> = {},
): ComponentMapEntry => ({
	category: ComponentCategory.TYPOGRAPHY,
	description,
	contentProps,
	styleProps: {
		sizeAndSpacing: {},
		typography: {},
		effects: {},
		...additionalStyleProps,
	},
});

/**
 * Helper function to create a form element component entry with common style properties
 */
const createFormElementComponent = (
	description: string,
	contentProps: Partial<ComponentContentProps>,
	additionalStyleProps: Partial<ComponentStyleProps> = {},
): ComponentMapEntry => ({
	category: ComponentCategory.FORM_ELEMENTS,
	description,
	contentProps,
	styleProps: {
		sizeAndSpacing: {},
		typography: {},
		background: {},
		bordersAndCorners: {},
		effects: {},
		...additionalStyleProps,
	},
});

/**
 * Component map containing all available components with their properties
 * Organized by component type for better maintainability
 */
export const componentMap: Record<ComponentName, ComponentMapEntry> = {
	// ===== LAYOUT COMPONENTS =====
	Section: createLayoutComponent(
		"A top-level container for organizing content sections",
	),

	Container: createLayoutComponent(
		"A general-purpose container for grouping related elements",
	),

	Grid: createLayoutComponent(
		"A container that arranges child elements in a grid layout",
	),

	Spacer: {
		category: ComponentCategory.LAYOUT,
		description: "Creates vertical or horizontal space between elements",
		contentProps: {},
		styleProps: {
			sizeAndSpacing: {},
		},
	},

	Divider: {
		category: ComponentCategory.LAYOUT,
		description: "A horizontal or vertical line that separates content",
		contentProps: {},
		styleProps: {
			sizeAndSpacing: {},
			bordersAndCorners: {},
			effects: {},
		},
	},

	// ===== TYPOGRAPHY COMPONENTS =====
	Heading: createTypographyComponent(
		"A heading element (H1-H6) for titles and subtitles",
		{ text: "", level: 1 },
	),

	Paragraph: createTypographyComponent("A paragraph of text", { text: "" }),

	RichText: createTypographyComponent(
		"Formatted text with rich styling options",
		{ content: "" },
		{
			background: {},
			bordersAndCorners: {},
		},
	),

	List: createTypographyComponent(
		"A bulleted or numbered list of items",
		{ listType: "bulleted", items: [] },
		{
			background: {},
			bordersAndCorners: {},
		},
	),

	Link: {
		category: ComponentCategory.TYPOGRAPHY,
		description: "A text link to another page or resource",
		contentProps: { text: "", href: "", openInNewTab: false },
		styleProps: {
			typography: {},
			background: {},
			bordersAndCorners: {},
			effects: {},
		},
	},

	// ===== INTERACTIVE COMPONENTS =====
	Button: {
		category: ComponentCategory.INTERACTIVE,
		description:
			"A clickable button that can trigger an action or navigation",
		contentProps: { text: "", href: "", icon: "" },
		styleProps: {
			sizeAndSpacing: {},
			typography: {},
			background: {},
			bordersAndCorners: {},
			effects: {},
		},
	},

	// ===== MEDIA COMPONENTS =====
	Image: {
		category: ComponentCategory.MEDIA,
		description: "An image element with alt text for accessibility",
		contentProps: { src: "", alt: "" },
		styleProps: {
			layout: {},
			sizeAndSpacing: {},
			bordersAndCorners: {},
			effects: {},
		},
	},

	Video: {
		category: ComponentCategory.MEDIA,
		description: "A video player with configurable controls",
		contentProps: { src: "", autoplay: false, controls: false },
		styleProps: {
			layout: {},
			sizeAndSpacing: {},
			bordersAndCorners: {},
			effects: {},
		},
	},

	Embed: {
		category: ComponentCategory.MEDIA,
		description: "An embedded iframe or custom HTML code",
		contentProps: { code: "" },
		styleProps: {
			layout: {},
			sizeAndSpacing: {},
		},
	},

	// ===== FORM COMPONENTS =====
	FormBlock: {
		category: ComponentCategory.FORM,
		description:
			"A container for form elements with success/error messages",
		contentProps: { successMessage: "", errorMessage: "" },
		styleProps: {
			layout: {},
			sizeAndSpacing: {},
			background: {},
			bordersAndCorners: {},
			effects: {},
		},
	},

	// ===== FORM ELEMENT COMPONENTS =====
	TextField: createFormElementComponent("A single-line text input field", {
		name: "",
		placeholder: "",
		required: false,
		type: "text",
	}),

	TextArea: createFormElementComponent("A multi-line text input field", {
		name: "",
		placeholder: "",
		required: false,
	}),

	Checkbox: createFormElementComponent(
		"A checkbox input with a label",
		{ label: "", defaultChecked: false },
		{ layout: {} },
	),

	RadioGroup: createFormElementComponent(
		"A group of radio button options",
		{ question: "", options: [] },
		{ layout: {} },
	),

	Dropdown: createFormElementComponent(
		"A dropdown select menu with options",
		{ name: "", options: [], defaultText: "" },
	),

	FileUpload: createFormElementComponent(
		"A file upload input with configurable file types and size limits",
		{ name: "", mimeTypes: [], maxFileSize: 0 },
	),

	SubmitButton: createFormElementComponent("A submit button for forms", {
		text: "",
	}),
};

/**
 * Get all components belonging to a specific category
 * @param category The category to filter by
 * @returns An array of component names in the specified category
 */
export const getComponentsByCategory = (
	category: ComponentCategory,
): ComponentName[] => {
	return (
		Object.entries(componentMap)
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			.filter(([_, component]) => component.category === category)
			.map(([name]) => name as ComponentName)
	);
};

/**
 * Get all available component categories
 * @returns An array of all component categories that have at least one component
 */
export const getAvailableCategories = (): ComponentCategory[] => {
	const categories = new Set<ComponentCategory>();

	Object.values(componentMap).forEach((component) => {
		categories.add(component.category);
	});

	return Array.from(categories);
};
