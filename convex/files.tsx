import { v } from 'convex/values';
import { mutation } from './_generated/server';
import { query } from './_generated/server';

export const createFile = mutation({
	args: {
		fileName: v.string(),
		teamId: v.string(),
		createdBy: v.string(),
		archive: v.boolean(),
		document: v.string(),
		whiteboard: v.string(),
	},

	handler: async (ctx, args) => {
		const result = await ctx.db.insert('files', args);
		return result;
	},
});

export const getFiles = query({
	args: {
		teamId: v.string(),
	},

	handler: async (ctx, args) => {
		const result = await ctx.db
			.query('files')
			.order('desc')
			.filter((q) => q.eq(q.field('teamId'), args.teamId))
			.collect();
		return result;
	},
});

export const deleteFile = mutation({
	args: {
		_id: v.id('files'),
	},

	handler: async (ctx, args) => {
		const result = await ctx.db.delete(args._id);
		return result;
	},
});

export const updateDocument = mutation({
	args: {
		_id: v.id('files'),
		document: v.string(),
	},

	handler: async (ctx, args) => {
		const result = await ctx.db.patch(args._id, { document: args.document });
		return result;
	},
});

export const updateWhiteboard = mutation({
	args: {
		_id: v.id('files'),
		whiteboard: v.string(),
	},

	handler: async (ctx, args) => {
		const result = await ctx.db.patch(args._id, {
			whiteboard: args.whiteboard,
		});
		return result;
	},
});

export const getFileById = query({
	args: {
		_id: v.id('files'),
	},

	handler: async (ctx, args) => {
		const result = await ctx.db.get(args._id);
		return result;
	},
});
