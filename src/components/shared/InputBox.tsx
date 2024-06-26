"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import MetaIcon from "../icons/MetaIcon";
import MistralIcon from "../icons/MistralIcon";
import GemmaIcon from "../icons/GemmaIcon";
import WhisperIcon from "../icons/WhisperIcon";

const formSchema = z.object({
  model: z.string().min(1, "Model is required"),
  creativeness: z
    .number()
    .min(0, "Temperature must be atleast 0")
    .max(2, "Temerature must be at most 1"),
  content: z
    .string()
    .min(50, "The content should contain at least 50 characters.")
    .max(500, "The content should be a maximum of 500 characters."),
  type: z.enum(["personal", "brand"], {
    errorMap: () => ({ message: "Type is required!" }),
  }),
  tone: z.enum(
    [
      "professional",
      "casual",
      "sarcastic",
      "funny",
      "passionate",
      "thoughtful",
    ],
    {
      errorMap: () => ({ message: "Tone is required!" }),
    }
  ),
  emojis: z.boolean(),
});

const InputBox = () => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      model: "llama3-8b-8192",
      creativeness: 1,
      content: "",
      type: "personal",
      tone: "professional",
      emojis: false,
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  console.log(WhisperIcon);

  return (
    <div className="relative flex flex-col items-start gap-8">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid w-full items-start gpa-6"
        >
          <fieldset className="grid gap-6 rounded-[8px] border p-4 bg-background/10 backdrop-blur-sm">
            <legend>User Inputs</legend>
            <div className="grid gap-3">
              <FormField
                control={form.control}
                name="model"
                render={({ field }) => (
                  <FormItem>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a AI model" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="llama3-8b-8192">
                          <div className="flex items-start gap-3 text-muted-foreground">
                            <MetaIcon className="size-5" />
                            <div>
                              <p>
                                <span className="text-foreground font-medium mr-2">
                                  LLaMA 3{" "}
                                </span>
                                8b
                              </p>
                            </div>
                          </div>
                        </SelectItem>
                        <SelectItem value="llama3-70b-8192">
                          <div className="flex items-start gap-3 text-muted-foreground">
                            <MetaIcon className="size-5" />
                            <div>
                              <p>
                                <span className="text-foreground font-medium mr-2">
                                  LLaMA 3{" "}
                                </span>
                                70b
                              </p>
                            </div>
                          </div>
                        </SelectItem>
                        <SelectItem value="mixtral-8x7b-32768">
                          <div className="flex items-start gap-3 text-muted-foreground">
                            <MistralIcon className="size-5" />
                            <div>
                              <p>
                                <span className="text-foreground font-medium mr-2">
                                  Mixtral
                                </span>
                                8x7b
                              </p>
                            </div>
                          </div>
                        </SelectItem>
                        <SelectItem value="gemma-7b-it">
                          <div className="flex items-start gap-3 text-muted-foreground">
                            <GemmaIcon className="size-5" />
                            <div>
                              <p>
                                <span className="text-foreground font-medium mr-2">
                                  Gemma
                                </span>
                                7b
                              </p>
                            </div>
                          </div>
                        </SelectItem>
                        <SelectItem value="whisper-large-v3">
                          <div className="flex items-start gap-3 text-muted-foreground">
                            <WhisperIcon className="size-5" />
                            <div>
                              <p>
                                <span className="text-foreground font-medium mr-2">
                                  Whisper
                                </span>
                              </p>
                            </div>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            </div>

            
            <Button type="submit">Submit</Button>
          </fieldset>
        </form>
      </Form>
    </div>
  );
};

export default InputBox;
