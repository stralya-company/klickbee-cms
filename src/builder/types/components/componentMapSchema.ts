import { z } from "zod";
import { componentContentPropsSchema } from "@/builder/types/components/properties/componentContentPropsSchema";
import { componentStylePropsSchema } from "@/builder/types/components/properties/componentStylePropsSchema";

/**
 * Zod schemas for component map entries
 * These schemas are used for validation of component map entries
 */

// Component category schema
export const componentCategorySchema = z.enum([
	"Layout",
	"Typography",
	"Media",
	"Interactive",
	"Form",
	"Form Elements",
]);
export type ComponentCategory = z.infer<typeof componentCategorySchema>;

// Component name schema
export const componentNameSchema = z.enum([
	// Layout components
	"Section",
	"Container",
	"Grid",
	"Spacer",
	"Divider",
	// Typography components
	"Heading",
	"Paragraph",
	"RichText",
	"List",
	"Link",
	// Interactive components
	"Button",
	// Media components
	"Image",
	"Video",
	"Embed",
	// Form components
	"FormBlock",
	// Form element components
	"TextField",
	"TextArea",
	"Checkbox",
	"RadioGroup",
	"Dropdown",
	"FileUpload",
	"SubmitButton",
]);
export type ComponentName = z.infer<typeof componentNameSchema>;

// Component map entry schema
export const componentMapEntrySchema = z.object({
	category: componentCategorySchema,
	contentProps: componentContentPropsSchema.partial(),
	styleProps: componentStylePropsSchema.partial(),
	description: z.string().optional(),
});
export type ComponentMapEntry = z.infer<typeof componentMapEntrySchema>;

// Component map schema
export const componentMapSchema = z.record(
	componentNameSchema,
	componentMapEntrySchema,
);
export type ComponentMap = z.infer<typeof componentMapSchema>;

// Helper function schemas
export const createLayoutComponentSchema = z
	.function()
	.args(
		z.string(),
		componentContentPropsSchema.partial().optional(),
		componentStylePropsSchema.partial().optional(),
	)
	.returns(componentMapEntrySchema);

export const createTypographyComponentSchema = z
	.function()
	.args(
		z.string(),
		componentContentPropsSchema.partial(),
		componentStylePropsSchema.partial().optional(),
	)
	.returns(componentMapEntrySchema);

export const createFormElementComponentSchema = z
	.function()
	.args(
		z.string(),
		componentContentPropsSchema.partial(),
		componentStylePropsSchema.partial().optional(),
	)
	.returns(componentMapEntrySchema);

// Utility function schemas
export const getComponentsByCategorySchema = z
	.function()
	.args(componentCategorySchema)
	.returns(z.array(componentNameSchema));

export const getAvailableCategoriesSchema = z
	.function()
	.args()
	.returns(z.array(componentCategorySchema));
