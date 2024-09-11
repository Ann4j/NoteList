import { FormField } from "../FormField";
import { Button } from "../Button";
import "./NoteForm.css";
import { useMutation } from "@tanstack/react-query";
import { createNote } from "../../api/note";
import { queryClient } from "../../api/queriClient";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { FC } from "react";

export interface iNoteFormProps {}

const createNoteSchema = z.object({
  title: z.string().min(5, "Длина заголовка должна быть не менее 5 символов"),
  text: z.string()
    .min(10, "Длина заголовка должна быть не менее 10 символов")
    .max(300, "Длина заголовка должна быть не более 300 символов")
})

type createNoteForm = z.infer<typeof createNoteSchema>


export const NoteForm: FC<iNoteFormProps> = () => {

  const { register, handleSubmit, formState: { errors}, reset } = useForm<createNoteForm>({
    resolver: zodResolver(createNoteSchema)
  })

  const createNoteMutation = useMutation({
    mutationFn: createNote,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['notes'] })
      reset()
    }
  }, queryClient);


  const onSubmit = (data: createNoteForm) => {
    createNoteMutation.mutate(data);
  };

  return (
    <form className="note-form" onSubmit={handleSubmit((onSubmit))}>
      <FormField label="Заголовок" errorMessage={errors.title?.message}>
        <input {...register("title")} />
      </FormField>
      <FormField label="Текст" errorMessage={errors.text?.message}>
        <textarea
          {...register("text")} />
      </FormField>
      <Button type="submit" isLoading={createNoteMutation.isPending}>Сохранить</Button>
    </form>
  );


};
