import { describe, expect, it } from "vitest";
import {
  ModelDocument,
  MongoRepository,
} from "../../../../../server/database/lib/mongo/mongo-repository";
import { MUSICAL_INSTRUMENTS, MusicalInstrument } from "../test-model";
import { mock } from "vitest-mock-extended";
import { Collection, FindCursor } from "mongodb";
import { date } from "../../../../utils";

describe("MongoRepository", () => {
  describe("get", () => {
    it("calls findOne correctly", async () => {
      const collection = mock<Collection<ModelDocument>>();
      const repository = new MongoRepository(MUSICAL_INSTRUMENTS, collection);

      await repository.get(1);

      expect(collection.findOne).toHaveBeenCalledWith({ _id: 1 });
    });
  });

  describe("find", () => {
    it("calls find correctly", async () => {
      const cursor = mock<FindCursor<Document>>();
      cursor.toArray.mockResolvedValue([]);
      const collection = mock<Collection<ModelDocument>>();
      collection.find.mockReturnValue(cursor);
      const repository = new MongoRepository(MUSICAL_INSTRUMENTS, collection);

      await repository.find({ where: { type: { not: "bass" } } });

      expect(collection.find).toHaveBeenCalledWith(
        { type: { $ne: "bass" } },
        { limit: undefined, sort: undefined },
      );
    });

    it("applies sorting and limits", async () => {
      const cursor = mock<FindCursor<Document>>();
      cursor.toArray.mockResolvedValue([]);
      const collection = mock<Collection<ModelDocument>>();
      collection.find.mockReturnValue(cursor);
      const repository = new MongoRepository(MUSICAL_INSTRUMENTS, collection);

      await repository.find({
        where: { type: { not: "bass" } },
        limit: 3,
        sort: { by: "built", direction: "desc" },
      });

      expect(collection.find).toHaveBeenCalledWith(
        { type: { $ne: "bass" } },
        { limit: 3, sort: ["built", "desc"] },
      );
    });
  });

  describe("first", () => {
    it("calls findOne correctly", async () => {
      const collection = mock<Collection<ModelDocument>>();
      const repository = new MongoRepository(MUSICAL_INSTRUMENTS, collection);

      await repository.first({ where: { type: { not: "bass" } } });

      expect(collection.findOne).toHaveBeenCalledWith({
        type: { $ne: "bass" },
      });
    });
  });

  describe("count", () => {
    it("calls countDocuments correctly", async () => {
      const collection = mock<Collection<ModelDocument>>();
      const repository = new MongoRepository(MUSICAL_INSTRUMENTS, collection);

      await repository.count({ where: { type: { not: "bass" } } });

      expect(collection.countDocuments).toHaveBeenCalledWith({
        type: { $ne: "bass" },
      });
    });
  });

  describe("create", () => {
    it("calls insertOne correctly", async () => {
      const collection = mock<Collection<ModelDocument>>();
      const repository = new MongoRepository(MUSICAL_INSTRUMENTS, collection);

      const built = date("2024-12-31T20:14:18Z");
      const instrument = new MusicalInstrument(1, "piano", built, {
        highest: "C8",
        lowest: "A0",
      });
      await repository.create(instrument);

      expect(collection.insertOne).toHaveBeenCalledWith({
        _id: 1,
        type: "piano",
        built,
        noteRange: {
          highest: "C8",
          lowest: "A0",
        },
      });
    });
  });

  describe("update", () => {
    it("calls updateOne correctly", async () => {
      const collection = mock<Collection<ModelDocument>>();
      const repository = new MongoRepository(MUSICAL_INSTRUMENTS, collection);

      const built = date("2024-12-31T20:14:18Z");
      const instrument = new MusicalInstrument(1, "piano", built, {
        highest: "C8",
        lowest: "A0",
      });
      await repository.update(instrument);

      expect(collection.updateOne).toHaveBeenCalledWith(
        { _id: 1 },
        {
          _id: 1,
          type: "piano",
          built,
          noteRange: {
            highest: "C8",
            lowest: "A0",
          },
        },
      );
    });
  });

  describe("delete", () => {
    it("calls deleteOne correctly", async () => {
      const collection = mock<Collection<ModelDocument>>();
      const repository = new MongoRepository(MUSICAL_INSTRUMENTS, collection);

      await repository.delete(1);

      expect(collection.deleteOne).toHaveBeenCalledWith({ _id: 1 });
    });
  });
});