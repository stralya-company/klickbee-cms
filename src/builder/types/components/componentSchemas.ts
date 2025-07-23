import { z } from "zod";
import { componentContentPropsSchema } from "@/builder/types/components/properties/componentContentPropsSchema";
import { componentStylePropsSchema } from "@/builder/types/components/properties/componentStylePropsSchema";
import {
	componentMap,
	ComponentName,
} from "@/builder/types/components/componentMap";

/**
 * Component-specific Zod schemas
 * These schemas are generated based on the component map and provide
 * targeted validation for each component type.
 */

// Helper function to create a component-specific schema
const createComponentSchema = (componentName: ComponentName) => {
	const component = componentMap[componentName];

	// Extract the content props that are defined for this component
	const contentPropsKeys = Object.keys(component.contentProps);
	const contentPropsSchema = z
		.object(
			contentPropsKeys.reduce(
				(acc, key) => {
					// @ts-expect-error - We know these keys exist in the schema
					acc[key] = componentContentPropsSchema.shape[key];
					return acc;
				},
				{} as Record<string, z.ZodTypeAny>,
			),
		)
		.strict(); // Use strict mode to reject additional properties

	// Extract the style props categories that are defined for this component
	const stylePropsSchema = componentStylePropsSchema.pick({
		...(component.styleProps.layout ? { layout: true } : {}),
		...(component.styleProps.sizeAndSpacing
			? { sizeAndSpacing: true }
			: {}),
		...(component.styleProps.typography ? { typography: true } : {}),
		...(component.styleProps.background ? { background: true } : {}),
		...(component.styleProps.bordersAndCorners
			? { bordersAndCorners: true }
			: {}),
		...(component.styleProps.effects ? { effects: true } : {}),
	});

	return {
		contentProps: contentPropsSchema,
		styleProps: stylePropsSchema,
	};
};

// Layout Components
export const sectionSchema = createComponentSchema("Section");
export const containerSchema = createComponentSchema("Container");
export const gridSchema = createComponentSchema("Grid");
export const spacerSchema = createComponentSchema("Spacer");
export const dividerSchema = createComponentSchema("Divider");

// Typography Components
export const headingSchema = createComponentSchema("Heading");
export const paragraphSchema = createComponentSchema("Paragraph");
export const richTextSchema = createComponentSchema("RichText");
export const listSchema = createComponentSchema("List");
export const linkSchema = createComponentSchema("Link");

// Interactive Components
export const buttonSchema = createComponentSchema("Button");

// Media Components
export const imageSchema = createComponentSchema("Image");
export const videoSchema = createComponentSchema("Video");
export const embedSchema = createComponentSchema("Embed");

// Form Components
export const formBlockSchema = createComponentSchema("FormBlock");

// Form Element Components
export const textFieldSchema = createComponentSchema("TextField");
export const textAreaSchema = createComponentSchema("TextArea");
export const checkboxSchema = createComponentSchema("Checkbox");
export const radioGroupSchema = createComponentSchema("RadioGroup");
export const dropdownSchema = createComponentSchema("Dropdown");
export const fileUploadSchema = createComponentSchema("FileUpload");
export const submitButtonSchema = createComponentSchema("SubmitButton");

// Component schemas map for easy access by component name
export const componentSchemas: Record<
	ComponentName,
	ReturnType<typeof createComponentSchema>
> = {
	Section: sectionSchema,
	Container: containerSchema,
	Grid: gridSchema,
	Spacer: spacerSchema,
	Divider: dividerSchema,
	Heading: headingSchema,
	Paragraph: paragraphSchema,
	RichText: richTextSchema,
	List: listSchema,
	Link: linkSchema,
	Button: buttonSchema,
	Image: imageSchema,
	Video: videoSchema,
	Embed: embedSchema,
	FormBlock: formBlockSchema,
	TextField: textFieldSchema,
	TextArea: textAreaSchema,
	Checkbox: checkboxSchema,
	RadioGroup: radioGroupSchema,
	Dropdown: dropdownSchema,
	FileUpload: fileUploadSchema,
	SubmitButton: submitButtonSchema,
};
